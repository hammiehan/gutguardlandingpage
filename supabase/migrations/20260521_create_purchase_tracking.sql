create table if not exists public.purchase_clicks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),

  offer_name text not null,
  offer_href text not null,
  page_url text,
  landing_page_url text,
  referrer_url text,
  user_agent text,
  ip_address inet,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  ttclid text,
  ttp text,
  tiktok_pixel_id text,

  metadata jsonb not null default '{}'::jsonb
);

create index if not exists purchase_clicks_created_at_idx on public.purchase_clicks (created_at desc);
create index if not exists purchase_clicks_offer_name_idx on public.purchase_clicks (offer_name);
create index if not exists purchase_clicks_ttclid_idx on public.purchase_clicks (ttclid);
create index if not exists purchase_clicks_metadata_gin_idx on public.purchase_clicks using gin (metadata);

drop trigger if exists purchase_clicks_set_updated_at on public.purchase_clicks;
create trigger purchase_clicks_set_updated_at
before update on public.purchase_clicks
for each row
execute function public.set_updated_at();

alter table public.purchase_clicks enable row level security;

drop policy if exists "service role full access on purchase_clicks" on public.purchase_clicks;
create policy "service role full access on purchase_clicks"
on public.purchase_clicks
for all
to service_role
using (true)
with check (true);

create table if not exists public.tiktok_webhook_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),

  platform text not null default 'tiktok',
  event_key text not null,
  client_key text,
  event_name text,
  event_created_at timestamptz,
  user_openid text,
  external_order_id text,
  order_status text,
  offer_name text,
  product_id text,
  sku_id text,
  amount numeric(12,2),
  currency text,
  signature_valid boolean not null default false,
  headers jsonb not null default '{}'::jsonb,
  raw_content jsonb not null default '{}'::jsonb,
  raw_payload jsonb not null default '{}'::jsonb
);

create unique index if not exists tiktok_webhook_events_event_key_uidx on public.tiktok_webhook_events (event_key);
create index if not exists tiktok_webhook_events_created_at_idx on public.tiktok_webhook_events (created_at desc);
create index if not exists tiktok_webhook_events_event_name_idx on public.tiktok_webhook_events (event_name);
create index if not exists tiktok_webhook_events_external_order_id_idx on public.tiktok_webhook_events (external_order_id);

drop trigger if exists tiktok_webhook_events_set_updated_at on public.tiktok_webhook_events;
create trigger tiktok_webhook_events_set_updated_at
before update on public.tiktok_webhook_events
for each row
execute function public.set_updated_at();

alter table public.tiktok_webhook_events enable row level security;

drop policy if exists "service role full access on tiktok_webhook_events" on public.tiktok_webhook_events;
create policy "service role full access on tiktok_webhook_events"
on public.tiktok_webhook_events
for all
to service_role
using (true)
with check (true);
