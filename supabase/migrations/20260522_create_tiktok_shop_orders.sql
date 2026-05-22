create table if not exists public.tiktok_shop_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),

  source_platform text not null default 'tiktok_shop',
  source text not null default 'manual_api',
  order_id text not null,
  order_status text,
  customer_name text,
  item_count integer,
  shipping_method text,
  delivery_option text,
  total_amount numeric(12,2),
  currency text,
  ordered_at timestamptz,
  raw_payload jsonb not null default '{}'::jsonb
);

create unique index if not exists tiktok_shop_orders_order_id_uidx on public.tiktok_shop_orders (order_id);
create index if not exists tiktok_shop_orders_created_at_idx on public.tiktok_shop_orders (created_at desc);
create index if not exists tiktok_shop_orders_status_idx on public.tiktok_shop_orders (order_status);
create index if not exists tiktok_shop_orders_ordered_at_idx on public.tiktok_shop_orders (ordered_at desc);
create index if not exists tiktok_shop_orders_payload_gin_idx on public.tiktok_shop_orders using gin (raw_payload);

drop trigger if exists tiktok_shop_orders_set_updated_at on public.tiktok_shop_orders;
create trigger tiktok_shop_orders_set_updated_at
before update on public.tiktok_shop_orders
for each row
execute function public.set_updated_at();

alter table public.tiktok_shop_orders enable row level security;

drop policy if exists "service role full access on tiktok_shop_orders" on public.tiktok_shop_orders;
create policy "service role full access on tiktok_shop_orders"
on public.tiktok_shop_orders
for all
to service_role
using (true)
with check (true);
