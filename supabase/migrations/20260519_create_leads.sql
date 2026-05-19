create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),

  -- Lead identity
  full_name text,
  first_name text,
  last_name text,
  email text,
  phone text,

  -- Funnel context
  lead_source text default 'landing_page',
  lead_status text default 'new',
  consent_marketing boolean default false,
  consent_privacy boolean default false,
  notes text,

  -- Landing-page attribution
  page_url text,
  landing_page_url text,
  referrer_url text,
  user_agent text,
  ip_address inet,

  -- UTM attribution
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  -- TikTok attribution
  ttclid text,
  ttp text,
  tiktok_pixel_id text,
  tik_tok_event text,

  -- Optional ad metadata
  click_id text,
  ad_platform text,
  campaign_id text,
  adgroup_id text,
  ad_id text,

  -- Raw payload for future flexibility
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_phone_idx on public.leads (phone);
create index if not exists leads_ttclid_idx on public.leads (ttclid);
create index if not exists leads_utm_campaign_idx on public.leads (utm_campaign);
create index if not exists leads_metadata_gin_idx on public.leads using gin (metadata);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

alter table public.leads enable row level security;

drop policy if exists "service role full access on leads" on public.leads;
create policy "service role full access on leads"
on public.leads
for all
to service_role
using (true)
with check (true);
