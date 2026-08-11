create table if not exists public.fitness_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  visitor_id text not null,
  lang text not null check (lang in ('en', 'pt')),
  source text not null default 'direct_fitness',
  path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists fitness_events_event_name_idx on public.fitness_events (event_name);
create index if not exists fitness_events_visitor_id_idx on public.fitness_events (visitor_id);
create index if not exists fitness_events_created_at_idx on public.fitness_events (created_at desc);
create index if not exists fitness_events_source_idx on public.fitness_events (source);

alter table public.fitness_events enable row level security;

-- Inserts are made server-side through the Supabase service role.
-- No anonymous insert policy is created for this MVP.
