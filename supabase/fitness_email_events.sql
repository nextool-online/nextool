create table if not exists public.fitness_email_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  email_hash text not null,
  lang text not null check (lang in ('en', 'pt')),
  source text not null default 'direct_fitness',
  sequence_id text not null,
  step_id text,
  provider text,
  provider_message_id text,
  offer_id text,
  url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists fitness_email_events_created_at_idx on public.fitness_email_events (created_at desc);
create index if not exists fitness_email_events_event_name_idx on public.fitness_email_events (event_name);
create index if not exists fitness_email_events_email_hash_idx on public.fitness_email_events (email_hash);
create index if not exists fitness_email_events_sequence_idx on public.fitness_email_events (sequence_id);
create index if not exists fitness_email_events_offer_idx on public.fitness_email_events (offer_id);

alter table public.fitness_email_events enable row level security;
