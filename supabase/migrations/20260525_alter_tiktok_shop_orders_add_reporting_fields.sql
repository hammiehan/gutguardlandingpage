alter table public.tiktok_shop_orders
add column if not exists offer_name text,
add column if not exists product_id text,
add column if not exists sku_id text;

create index if not exists tiktok_shop_orders_offer_name_idx
on public.tiktok_shop_orders (offer_name);

create index if not exists tiktok_shop_orders_product_id_idx
on public.tiktok_shop_orders (product_id);

create index if not exists tiktok_shop_orders_sku_id_idx
on public.tiktok_shop_orders (sku_id);
