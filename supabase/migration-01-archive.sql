-- Run this in the Supabase SQL editor if you already created the table from an
-- earlier copy of schema.sql. It is safe to run more than once.
--
-- Adds archiving. Archiving is deliberately NOT a value of `status`: status is
-- the workflow (new → in progress → closed) and archiving is separate from it,
-- so an archived inquiry keeps whatever status it had and gets it back intact
-- when it is restored.
--
-- Nothing is ever deleted. "Delete" in the dashboard sets this timestamp.

alter table public.contact_submissions
  add column if not exists archived_at timestamptz;

create index if not exists contact_submissions_archived_idx
  on public.contact_submissions (archived_at);

comment on column public.contact_submissions.archived_at is
  'When staff archived this inquiry. NULL means active. Archiving hides it from the default dashboard view; it is never a delete.';
