# Supabase Lead Storage Setup

This project does not yet submit leads to Supabase, but the table schema is ready.

## What to do in Supabase

1. Open your Supabase project.
2. Go to `SQL Editor`.
3. Create a new query.
4. Paste the contents of:
   - `supabase/migrations/20260519_create_leads.sql`
5. Click `Run`.

## What this creates

The `public.leads` table stores:

- lead identity: `full_name`, `email`, `phone`
- consent flags: `consent_marketing`, `consent_privacy`
- page context: `page_url`, `landing_page_url`, `referrer_url`
- marketing attribution: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- TikTok attribution: `ttclid`, `ttp`, `tiktok_pixel_id`, `tik_tok_event`
- flexible extra data: `metadata`

## Verify the table

1. Go to `Table Editor`.
2. Confirm the table `leads` exists under the `public` schema.
3. Open the table and confirm columns like `email`, `phone`, `ttclid`, and `utm_campaign` are present.

## Important security note

This migration enables RLS and only gives access to `service_role`.

That means:

- browser clients cannot insert directly yet
- safest next step is a server-side API route that writes to Supabase using the service role key

## Environment variables to prepare

When you are ready to connect the app, add these in Vercel and local `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Lead API route now included

This repo now includes:

- `src/app/api/leads/route.ts`

It accepts `POST /api/leads` with JSON such as:

```json
{
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+639171234567",
  "consent_privacy": true,
  "consent_marketing": true,
  "page_url": "https://gutguardlandingpage.vercel.app/?utm_source=tiktok&utm_campaign=test&ttclid=abc123",
  "tiktok_pixel_id": "D862IU3C77U8MI6UL9D0",
  "tik_tok_event": "SubmitLead",
  "metadata": {
    "cta": "closing_cta"
  }
}
```

The route automatically attempts to capture:

- `ttclid` from the body or URL
- `_ttp` from cookies
- UTM params from `page_url`
- `user-agent`
- requester IP from `x-forwarded-for`

## Recommended next implementation step

1. Add the three env vars locally and in Vercel.
2. Build the actual lead form or CTA submission flow.
3. Submit lead data to `POST /api/leads`.
4. Optionally fire a TikTok `CompleteRegistration` or `SubmitLead` event alongside the save.
