-- OPTIONAL BACKEND SETUP — Supabase SQL Editor > New query > Run.
-- This stores one row per participant with all 24 responses in a JSONB array.
-- IMPORTANT: Public submit access needs spam controls before a large deployment.

create table if not exists public.asf_responses (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  participant_id text not null unique,
  form_version text not null,
  consent boolean not null,
  participation_mode text not null check (participation_mode in ('anonymous', 'details')),
  personal_details jsonb,
  answers jsonb not null,
  constraint require_consent check (consent is true),
  constraint answers_are_array check (jsonb_typeof(answers) = 'array'),
  constraint anonymous_has_no_details check (participation_mode <> 'anonymous' or personal_details is null)
);

alter table public.asf_responses enable row level security;

-- By default, public visitors can INSERT only: they cannot READ, UPDATE or DELETE.
revoke all on table public.asf_responses from anon, authenticated;
grant insert on table public.asf_responses to anon;

-- Explicitly scope insert access to unauthenticated visitors.
drop policy if exists "Participants may submit one response" on public.asf_responses;
create policy "Participants may submit one response"
  on public.asf_responses
  for insert
  to anon
  with check (consent is true and jsonb_array_length(answers) = 24);

-- Only you (Supabase dashboard / SQL Editor, using owner credentials) read the data.
-- Never put a secret/service_role key in the website JavaScript.
