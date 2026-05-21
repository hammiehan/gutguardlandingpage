import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

type TikTokWebhookEnvelope = {
  client_key?: string;
  event?: string;
  create_time?: number;
  user_openid?: string;
  content?: string | Record<string, unknown>;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
const TIKTOK_SIGNATURE_MAX_AGE_SECONDS = 300;

function isSupabaseOpaqueKey(key: string) {
  return key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function parseUnixTimestamp(value: unknown) {
  const numeric = getNumber(value);

  if (numeric === null) {
    return null;
  }

  // TikTok test events may send Unix time in milliseconds instead of seconds.
  const milliseconds = numeric > 1e12 ? numeric : numeric * 1000;
  const parsedDate = new Date(milliseconds);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
}

function getObject(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function parseSignatureHeader(signatureHeader: string | null) {
  if (!signatureHeader) {
    return null;
  }

  const entries = signatureHeader.split(",").map((part) => part.trim());
  const timestamp = entries.find((entry) => entry.startsWith("t="))?.slice(2) ?? null;
  const signature = entries.find((entry) => entry.startsWith("s="))?.slice(2) ?? null;

  if (!timestamp || !signature) {
    return null;
  }

  return { timestamp, signature };
}

function timingSafeEqualHex(a: string, b: string) {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

function verifySignature(rawBody: string, signatureHeader: string | null) {
  if (!TIKTOK_CLIENT_SECRET) {
    return { ok: false, reason: "TIKTOK_CLIENT_SECRET is missing." };
  }

  const parsed = parseSignatureHeader(signatureHeader);

  if (!parsed) {
    return { ok: false, reason: "TikTok-Signature header is missing or malformed." };
  }

  const timestampSeconds = Number(parsed.timestamp);

  if (!Number.isFinite(timestampSeconds)) {
    return { ok: false, reason: "Signature timestamp is invalid." };
  }

  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - timestampSeconds);

  if (ageSeconds > TIKTOK_SIGNATURE_MAX_AGE_SECONDS) {
    return { ok: false, reason: "Signature timestamp is too old." };
  }

  const signedPayload = `${parsed.timestamp}.${rawBody}`;
  const expectedSignature = crypto
    .createHmac("sha256", TIKTOK_CLIENT_SECRET)
    .update(signedPayload)
    .digest("hex");

  if (!timingSafeEqualHex(parsed.signature, expectedSignature)) {
    return { ok: false, reason: "Signature verification failed." };
  }

  return { ok: true, reason: null };
}

function parseContent(content: TikTokWebhookEnvelope["content"]) {
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content) as unknown;
      return getObject(parsed) ?? {};
    } catch {
      return {};
    }
  }

  return getObject(content) ?? {};
}

function pickFirstString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = getString(record[key]);

    if (value) {
      return value;
    }
  }

  return null;
}

function pickFirstNumber(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = getNumber(record[key]);

    if (value !== null) {
      return value;
    }
  }

  return null;
}

function buildEventKey(body: TikTokWebhookEnvelope, content: Record<string, unknown>) {
  const orderId = pickFirstString(content, [
    "order_id",
    "orderId",
    "trade_order_id",
    "tradeOrderId",
    "external_order_id",
    "externalOrderId",
  ]);

  return [
    getString(body.client_key) ?? "unknown-client",
    getString(body.event) ?? "unknown-event",
    String(body.create_time ?? 0),
    getString(body.user_openid) ?? "unknown-user",
    orderId ?? "no-order",
  ].join(":");
}

function buildWebhookEventRecord(
  request: NextRequest,
  body: TikTokWebhookEnvelope,
  content: Record<string, unknown>,
  rawPayload: Record<string, unknown>,
  signatureValid: boolean,
) {
  const eventCreatedAt = parseUnixTimestamp(body.create_time);

  const amount =
    pickFirstNumber(content, ["amount", "total_amount", "payment_amount", "price"]) ??
    pickFirstNumber(getObject(content.order_info) ?? {}, ["amount", "total_amount", "payment_amount", "price"]);

  const offerName =
    pickFirstString(content, ["offer_name", "product_name", "sku_name"]) ??
    pickFirstString(getObject(content.order_info) ?? {}, ["offer_name", "product_name", "sku_name"]);

  return {
    platform: "tiktok",
    event_key: buildEventKey(body, content),
    client_key: getString(body.client_key),
    event_name: getString(body.event),
    event_created_at: eventCreatedAt,
    user_openid: getString(body.user_openid),
    external_order_id: pickFirstString(content, [
      "order_id",
      "orderId",
      "trade_order_id",
      "tradeOrderId",
      "external_order_id",
      "externalOrderId",
    ]),
    order_status: pickFirstString(content, ["order_status", "trade_order_status", "status"]),
    offer_name: offerName,
    product_id: pickFirstString(content, ["product_id", "productId"]),
    sku_id: pickFirstString(content, ["sku_id", "skuId"]),
    amount,
    currency:
      pickFirstString(content, ["currency", "currency_code"]) ??
      pickFirstString(getObject(content.order_info) ?? {}, ["currency", "currency_code"]),
    signature_valid: signatureValid,
    headers: {
      "tiktok-signature": request.headers.get("TikTok-Signature"),
      "user-agent": request.headers.get("user-agent"),
      "x-forwarded-for": request.headers.get("x-forwarded-for"),
    },
    raw_content: content,
    raw_payload: rawPayload,
  };
}

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[tiktok-webhook] Missing Supabase environment variables.");
    return NextResponse.json(
      { error: "Supabase environment variables are missing." },
      { status: 500 },
    );
  }

  const rawBody = await request.text();
  const signatureCheck = verifySignature(rawBody, request.headers.get("TikTok-Signature"));

  if (!signatureCheck.ok) {
    console.error("[tiktok-webhook] Signature verification failed:", signatureCheck.reason);
    return NextResponse.json({ error: signatureCheck.reason }, { status: 401 });
  }

  let payload: TikTokWebhookEnvelope;

  try {
    payload = JSON.parse(rawBody) as TikTokWebhookEnvelope;
  } catch {
    console.error("[tiktok-webhook] Invalid JSON payload:", rawBody);
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (TIKTOK_CLIENT_KEY && getString(payload.client_key) !== TIKTOK_CLIENT_KEY) {
    console.error("[tiktok-webhook] Unexpected client_key:", payload.client_key);
    return NextResponse.json({ error: "Unexpected client_key." }, { status: 401 });
  }

  const content = parseContent(payload.content);
  const rawPayload = getObject(payload) ?? {};
  const webhookEventRecord = buildWebhookEventRecord(
    request,
    payload,
    content,
    rawPayload,
    true,
  );

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Prefer: "resolution=merge-duplicates,return=representation",
  };

  if (!isSupabaseOpaqueKey(SUPABASE_SERVICE_ROLE_KEY)) {
    headers.Authorization = `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`;
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/tiktok_webhook_events?on_conflict=event_key`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(webhookEventRecord),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[tiktok-webhook] Failed to store webhook event in Supabase.", {
      status: response.status,
      statusText: response.statusText,
      details: errorText,
      eventKey: webhookEventRecord.event_key,
      eventName: webhookEventRecord.event_name,
    });

    return NextResponse.json(
      { error: "Failed to store TikTok webhook event.", details: errorText },
      { status: 500 },
    );
  }

  const [savedEvent] = (await response.json()) as Array<{ id: string; event_key: string }>;

  return NextResponse.json({
    ok: true,
    id: savedEvent?.id ?? null,
    event_key: savedEvent?.event_key ?? webhookEventRecord.event_key,
  });
}
