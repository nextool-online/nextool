create table if not exists public.fitness_ad_costs (
  id uuid primary key default gen_random_uuid(),
  spend_date date not null,
  lang text not null check (lang in ('en', 'pt')),
  calculator text not null,
  ad_platform text not null,
  utm_campaign text not null,
  utm_term text,
  clicks integer not null default 0 check (clicks >= 0),
  cost numeric(12, 2) not null default 0 check (cost >= 0),
  currency text not null default 'USD',
  created_at timestamptz not null default now()
);

create index if not exists fitness_ad_costs_spend_date_idx on public.fitness_ad_costs (spend_date desc);
create index if not exists fitness_ad_costs_calculator_idx on public.fitness_ad_costs (calculator);
create index if not exists fitness_ad_costs_campaign_idx on public.fitness_ad_costs (utm_campaign);
create index if not exists fitness_ad_costs_lang_idx on public.fitness_ad_costs (lang);

alter table public.fitness_ad_costs enable row level security;


alter table public.fitness_ad_costs
  add constraint fitness_ad_costs_unique_import_key
  unique (spend_date, lang, calculator, ad_platform, utm_campaign, utm_term);
