# Secret Rotation Checklist

Use this checklist after any credential has been exposed in screenshots, chat, logs, or a committed file.

## Rotate Now

1. TikTok `TIKTOK_CLIENT_SECRET`
2. Supabase `SUPABASE_SERVICE_ROLE_KEY`

## Also Review

1. Supabase `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   This is a publishable key, so rotation is less urgent than the service role key, but rotate it too if you want a clean reset after public exposure.
2. Any provider app secrets entered into Supabase:
   - Google client secret
   - GitHub client secret
   - Facebook app secret

## Where To Rotate

### TikTok

1. TikTok Developers -> `GutGuard` app -> `Credentials`
2. Regenerate the client secret
3. Update:
   - local `.env.local`
   - Vercel project environment variables

### Supabase Service Role Key

1. Supabase Dashboard -> Project Settings -> API
2. Rotate/regenerate the service role key
3. Update:
   - local `.env.local`
   - Vercel project environment variables

## After Rotation

1. Restart local dev server
2. Redeploy Vercel
3. Re-test:
   - Google sign-in
   - GitHub sign-in
   - TikTok sign-in
   - leads / purchase click endpoints
   - TikTok webhook, if used

## Repo Safety Rules

1. Keep real secrets only in:
   - `.env.local`
   - Vercel environment variables
2. Keep placeholders only in `.env.example`
3. Do not paste secrets into screenshots or chat
4. If a secret was pasted publicly, assume it is compromised and rotate it
