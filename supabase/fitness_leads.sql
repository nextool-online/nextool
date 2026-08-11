-- NexTool Fit email conversion MVP
-- Run this in Supabase SQL editor before enabling live lead storage.

create table if not exists public.fitness_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  lang text not null check (lang in ('en', 'pt')),
  source text not null default 'direct_fitness',
  profile jsonb not null default '{}'::jsonb,
  snapshot jsonb not null default '{}'::jsonb,
  consent_at timestamptz not null,
  user_agent text,
  referer text,
  created_at timestamptz not null default now()
);

create index if not exists fitness_leads_email_idx on public.fitness_leads (lower(email));
create index if not exists fitness_leads_created_at_idx on public.fitness_leads (created_at desc);
create index if not exists fitness_leads_source_idx on public.fitness_leads (source);

alter table public.fitness_leads enable row level security;

-- Server inserts use SUPABASE_SERVICE_ROLE_KEY and bypass RLS.
-- Do not add anon insert policies unless the API route is removed.
