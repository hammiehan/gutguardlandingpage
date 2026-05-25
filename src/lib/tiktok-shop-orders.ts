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

function getObject(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function parseTimestamp(value: unknown) {
  if (typeof value === "string" && value.trim()) {
    const directDate = new Date(value);

    if (!Number.isNaN(directDate.getTime())) {
      return directDate.toISOString();
    }
  }

  const numeric = getNumber(value);

  if (numeric === null) {
    return null;
  }

  const milliseconds = numeric > 1e12 ? numeric : numeric * 1000;
  const parsedDate = new Date(milliseconds);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
}

function getRecordCandidates(payload: Record<string, unknown>) {
  const order = getObject(payload.order);
  const data = getObject(payload.data);
  const orderInfo = getObject(payload.order_info);
  const content = getObject(payload.content);

  return [payload, order, data, orderInfo, content].filter(
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

function resolveItemCount(records: Array<Record<string, unknown>>) {
  const explicitCount = pickFirstNumber(records, [
    "item_count",
    "itemCount",
    "items_count",
    "itemsCount",
    "quantity",
    "qty",
  ]);

  if (explicitCount !== null) {
    return Math.trunc(explicitCount);
  }

  for (const record of records) {
    const items = record.items;

    if (Array.isArray(items)) {
      return items.length;
    }
  }

  return null;
}

export type TikTokShopOrderRecord = {
  source_platform: "tiktok_shop";
  source: string;
  order_id: string;
  order_status: string | null;
  customer_name: string | null;
  offer_name: string | null;
  product_id: string | null;
  sku_id: string | null;
  item_count: number | null;
  shipping_method: string | null;
  delivery_option: string | null;
  total_amount: number | null;
  currency: string | null;
  ordered_at: string | null;
  raw_payload: Record<string, unknown>;
};

export function normalizeTikTokShopOrder(
  input: unknown,
  source: string,
): TikTokShopOrderRecord | null {
  const payload = getObject(input);

  if (!payload) {
    return null;
  }

  const records = getRecordCandidates(payload);
  const orderId = pickFirstString(records, [
    "order_id",
    "orderId",
    "trade_order_id",
    "tradeOrderId",
    "external_order_id",
    "externalOrderId",
    "shop_order_id",
    "shopOrderId",
    "id",
  ]);

  if (!orderId) {
    return null;
  }

  return {
    source_platform: "tiktok_shop",
    source,
    order_id: orderId,
    order_status: pickFirstString(records, [
      "order_status",
      "trade_order_status",
      "tradeOrderStatus",
      "status",
      "order_state",
      "orderState",
    ]),
    customer_name: pickFirstString(records, [
      "customer_name",
      "customerName",
      "buyer_name",
      "buyerName",
      "recipient_name",
      "recipientName",
      "user_name",
      "userName",
      "masked_buyer_name",
      "maskedBuyerName",
      "customer",
    ]),
    offer_name: pickFirstString(records, [
      "offer_name",
      "offerName",
      "product_name",
      "productName",
      "sku_name",
      "skuName",
      "title",
    ]),
    product_id: pickFirstString(records, [
      "product_id",
      "productId",
      "third_product_id",
      "thirdProductId",
      "item_id",
      "itemId",
    ]),
    sku_id: pickFirstString(records, [
      "sku_id",
      "skuId",
      "seller_sku",
      "sellerSku",
      "variant_id",
      "variantId",
    ]),
    item_count: resolveItemCount(records),
    shipping_method: pickFirstString(records, [
      "shipping_method",
      "shippingMethod",
      "fulfillment_type",
      "fulfillmentType",
      "shipping_type",
      "shippingType",
    ]),
    delivery_option: pickFirstString(records, [
      "delivery_option",
      "deliveryOption",
      "delivery_method",
      "deliveryMethod",
      "shipping_option",
      "shippingOption",
    ]),
    total_amount: pickFirstNumber(records, [
      "total_amount",
      "totalAmount",
      "payment_amount",
      "paymentAmount",
      "amount",
      "price",
      "order_total",
      "orderTotal",
    ]),
    currency: pickFirstString(records, [
      "currency",
      "currency_code",
      "currencyCode",
    ]),
    ordered_at:
      parseTimestamp(
        pickFirstString(records, ["order_time", "orderTime", "created_at", "createdAt"]) ??
          pickFirstNumber(records, ["create_time", "createTime"]),
      ),
    raw_payload: payload,
  };
}
