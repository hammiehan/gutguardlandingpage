import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { normalizeTikTokShopOrder } from "@/lib/tiktok-shop-orders";

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

function getRecordCandidates(content: Record<string, unknown>) {
  const orderInfo = getObject(content.order_info);
  const data = getObject(content.data);

  return [content, orderInfo, data].filter(
    (record): record is Record<string, unknown> => Boolean(record),
  );
}

function pickFirstString(records: Array<Record<string, unknown>>, keys: string[]) {
  for (const record of records) {
    for (const key of keys) {
      const value = getString(record[key]);

      if (value) {
        return value;
      }
    }
  }

  return null;
}

function pickFirstNumber(records: Array<Record<string, unknown>>, keys: string[]) {
  for (const record of records) {
    for (const key of keys) {
      const value = getNumber(record[key]);

      if (value !== null) {
        return value;
      }
    }
  }

  return null;
}

function buildFallbackEventKey(rawBody: string) {
  return crypto.createHash("sha256").update(rawBody).digest("hex");
}

function resolveOrderId(records: Array<Record<string, unknown>>) {
  return pickFirstString(records, [
    "order_id",
    "orderId",
    "trade_order_id",
    "tradeOrderId",
    "external_order_id",
    "externalOrderId",
    "shop_order_id",
    "shopOrderId",
  ]);
}

function resolveOrderStatus(records: Array<Record<string, unknown>>) {
  return pickFirstString(records, [
    "order_status",
    "trade_order_status",
    "tradeOrderStatus",
    "status",
    "order_state",
    "orderState",
  ]);
}

function resolveOfferName(records: Array<Record<string, unknown>>) {
  return pickFirstString(records, [
    "offer_name",
    "offerName",
    "product_name",
    "productName",
    "sku_name",
    "skuName",
    "title",
  ]);
}

function resolveAmount(records: Array<Record<string, unknown>>) {
  return pickFirstNumber(records, [
    "amount",
    "total_amount",
    "totalAmount",
    "payment_amount",
    "paymentAmount",
    "price",
    "refund_amount",
    "refundAmount",
  ]);
}

function resolveProductId(records: Array<Record<string, unknown>>) {
  return pickFirstString(records, [
    "product_id",
    "productId",
    "third_product_id",
    "thirdProductId",
    "item_id",
    "itemId",
  ]);
}

function resolveSkuId(records: Array<Record<string, unknown>>) {
  return pickFirstString(records, [
    "sku_id",
    "skuId",
    "seller_sku",
    "sellerSku",
    "variant_id",
    "variantId",
  ]);
}

function resolveCurrency(records: Array<Record<string, unknown>>) {
  return pickFirstString(records, [
    "currency",
    "currency_code",
    "currencyCode",
  ]);
}

function buildEventKey(
  body: TikTokWebhookEnvelope,
  records: Array<Record<string, unknown>>,
  rawBody: string,
) {
  const orderId = resolveOrderId(records);

  const baseKey = [
    getString(body.client_key) ?? "unknown-client",
    getString(body.event) ?? "unknown-event",
    String(body.create_time ?? 0),
    getString(body.user_openid) ?? "unknown-user",
    orderId ?? "no-order",
  ].join(":");

  if (orderId || getString(body.event) || body.create_time || getString(body.user_openid)) {
    return baseKey;
  }

  return `raw:${buildFallbackEventKey(rawBody)}`;
}

function buildDiagnosticHeaders(request: NextRequest, extras?: Record<string, unknown>) {
  return {
    "tiktok-signature": request.headers.get("TikTok-Signature"),
    "user-agent": request.headers.get("user-agent"),
    "x-forwarded-for": request.headers.get("x-forwarded-for"),
    ...(extras ?? {}),
  };
}

function buildRawPayload(payload: TikTokWebhookEnvelope | null, rawBody: string) {
  if (payload) {
    return getObject(payload) ?? {};
  }

  return {
    _raw_body: rawBody,
  };
}

async function saveWebhookEventRecord(record: Record<string, unknown>) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_SERVICE_ROLE_KEY!,
    Prefer: "resolution=merge-duplicates,return=representation",
  };

  if (!isSupabaseOpaqueKey(SUPABASE_SERVICE_ROLE_KEY!)) {
    headers.Authorization = `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`;
  }

  return fetch(
    `${SUPABASE_URL}/rest/v1/tiktok_webhook_events?on_conflict=event_key`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(record),
      cache: "no-store",
    },
  );
}

async function saveNormalizedOrderRecord(record: Record<string, unknown>) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_SERVICE_ROLE_KEY!,
    Prefer: "resolution=merge-duplicates,return=representation",
  };

  if (!isSupabaseOpaqueKey(SUPABASE_SERVICE_ROLE_KEY!)) {
    headers.Authorization = `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`;
  }

  return fetch(
    `${SUPABASE_URL}/rest/v1/tiktok_shop_orders?on_conflict=order_id`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(record),
      cache: "no-store",
    },
  );
}

function buildRejectedWebhookRecord(
  request: NextRequest,
  rawBody: string,
  payload: TikTokWebhookEnvelope | null,
  signatureReason: string,
) {
  const content = parseContent(payload?.content);
  const records = getRecordCandidates(content);

  return {
    platform: "tiktok",
    event_key: buildEventKey(payload ?? {}, records, rawBody),
    client_key: getString(payload?.client_key),
    event_name: getString(payload?.event),
    event_created_at: parseUnixTimestamp(payload?.create_time),
    user_openid: getString(payload?.user_openid),
    external_order_id: resolveOrderId(records),
    order_status: resolveOrderStatus(records),
    offer_name: resolveOfferName(records),
    product_id: resolveProductId(records),
    sku_id: resolveSkuId(records),
    amount: resolveAmount(records),
    currency: resolveCurrency(records),
    signature_valid: false,
    headers: buildDiagnosticHeaders(request, {
      verification_reason: signatureReason,
    }),
    raw_content: content,
    raw_payload: buildRawPayload(payload, rawBody),
  };
}

function tryParsePayload(rawBody: string) {
  try {
    return JSON.parse(rawBody) as TikTokWebhookEnvelope;
  } catch {
    return null;
  }
}

function buildAcceptedWebhookRecord(
  request: NextRequest,
  rawBody: string,
  body: TikTokWebhookEnvelope,
  content: Record<string, unknown>,
) {
  const records = getRecordCandidates(content);

  return {
    platform: "tiktok",
    event_key: buildEventKey(body, records, rawBody),
    client_key: getString(body.client_key),
    event_name: getString(body.event),
    event_created_at: parseUnixTimestamp(body.create_time),
    user_openid: getString(body.user_openid),
    external_order_id: resolveOrderId(records),
    order_status: resolveOrderStatus(records),
    offer_name: resolveOfferName(records),
    product_id: resolveProductId(records),
    sku_id: resolveSkuId(records),
    amount: resolveAmount(records),
    currency: resolveCurrency(records),
    signature_valid: true,
    headers: buildDiagnosticHeaders(request),
    raw_content: content,
    raw_payload: buildRawPayload(body, rawBody),
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
  const payload = tryParsePayload(rawBody);
  const signatureCheck = verifySignature(rawBody, request.headers.get("TikTok-Signature"));

  if (!signatureCheck.ok) {
    const signatureReason = signatureCheck.reason ?? "Signature verification failed.";
    const rejectedRecord = buildRejectedWebhookRecord(
      request,
      rawBody,
      payload,
      signatureReason,
    );
    const rejectedSaveResponse = await saveWebhookEventRecord(rejectedRecord);

    if (!rejectedSaveResponse.ok) {
      const details = await rejectedSaveResponse.text();
      console.error("[tiktok-webhook] Failed to store rejected webhook attempt.", {
        details,
        reason: signatureReason,
      });
    }

    console.error("[tiktok-webhook] Signature verification failed:", signatureReason);
    return NextResponse.json({ error: signatureReason }, { status: 401 });
  }

  if (!payload) {
    console.error("[tiktok-webhook] Invalid JSON payload:", rawBody);
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (TIKTOK_CLIENT_KEY && getString(payload.client_key) !== TIKTOK_CLIENT_KEY) {
    console.error("[tiktok-webhook] Unexpected client_key:", payload.client_key);
    return NextResponse.json({ error: "Unexpected client_key." }, { status: 401 });
  }

  const content = parseContent(payload.content);
  const webhookEventRecord = buildAcceptedWebhookRecord(
    request,
    rawBody,
    payload,
    content,
  );
  const response = await saveWebhookEventRecord(webhookEventRecord);

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
  const normalizedOrder = normalizeTikTokShopOrder(payload, "webhook");

  if (normalizedOrder) {
    const orderSaveResponse = await saveNormalizedOrderRecord(normalizedOrder);

    if (!orderSaveResponse.ok) {
      const details = await orderSaveResponse.text();
      console.error("[tiktok-webhook] Failed to mirror order into tiktok_shop_orders.", {
        details,
        eventKey: webhookEventRecord.event_key,
        orderId: normalizedOrder.order_id,
      });
    }
  }

  return NextResponse.json({
    ok: true,
    id: savedEvent?.id ?? null,
    event_key: savedEvent?.event_key ?? webhookEventRecord.event_key,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "tiktok-webhook",
  });
}
