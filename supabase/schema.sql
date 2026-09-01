-- Promise Place Community Center — contact form storage
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists public.contact_submissions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  first_name        text not null,
  last_name         text not null,
  email             text not null,
  phone             text,
  seeking_for       text,
  topic             text,
  preferred_contact text,
  message           text not null,

  -- so staff can work the list instead of re-reading it
  status            text not null default 'new'
                    check (status in ('new', 'in_progress', 'closed')),
  staff_notes       text,

  -- abuse control only. The raw IP is never stored: this is a salted SHA-256,
  -- which cannot be reversed back to an address.
  ip_hash           text,
  user_agent        text
);

-- newest first is how the table will always be read
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- the rate limiter looks up recent rows by hash
create index if not exists contact_submissions_ip_hash_idx
  on public.contact_submissions (ip_hash, created_at desc);

-- RLS on with NO policies is deliberate: it means the anon and authenticated
-- keys can do nothing at all with this table. The website writes to it with the
-- service role key, which bypasses RLS and never leaves the server.
alter table public.contact_submissions enable row level security;

comment on table public.contact_submissions is
  'Website contact form submissions. Contains free-text messages from the public, which may include health information — see the HIPAA note in README.md before granting access or exporting.';


-- ---------------------------------------------------------------------------
-- Staff dashboard access
--
-- The dashboard at /admin signs in against Supabase Auth. Create exactly one
-- user for it:
--   Dashboard → Authentication → Users → Add user → Create new user
--   Email:    admin@promiseplacecc.com
--   Password: (something long; store it in a password manager)
--   Tick "Auto Confirm User" so no confirmation email is needed.
--
-- Then, so that nobody else can ever create an account:
--   Dashboard → Authentication → Providers → Email → turn OFF "Enable sign ups"
--
-- The site also refuses any address other than ADMIN_EMAIL, at sign-in and on
-- every page load, so both layers have to fail before anyone else gets in.
-- ---------------------------------------------------------------------------
