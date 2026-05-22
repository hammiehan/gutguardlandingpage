import { NextRequest, NextResponse } from "next/server";

import { normalizeTikTokShopOrder } from "@/lib/tiktok-shop-orders";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isSupabaseOpaqueKey(key: string) {
  return key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");
}

async function saveOrderRecord(record: Record<string, unknown>) {
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

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "tiktok-orders",
  });
}

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Supabase environment variables are missing." },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const orderRecord = normalizeTikTokShopOrder(payload, "manual_api");

  if (!orderRecord) {
    return NextResponse.json(
      { error: "Payload does not contain a recognizable order_id." },
      { status: 400 },
    );
  }

  const response = await saveOrderRecord(orderRecord);

  if (!response.ok) {
    const details = await response.text();

    return NextResponse.json(
      { error: "Failed to store TikTok Shop order.", details },
      { status: 500 },
    );
  }

  const [savedOrder] = (await response.json()) as Array<{ id: string; order_id: string }>;

  return NextResponse.json({
    ok: true,
    id: savedOrder?.id ?? null,
    order_id: savedOrder?.order_id ?? orderRecord.order_id,
  });
}
