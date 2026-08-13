create table if not exists public.fitness_affiliate_revenue (
  id uuid primary key default gen_random_uuid(),
  revenue_date date not null,
  lang text not null check (lang in ('en', 'pt')),
  calculator text not null,
  affiliate_platform text not null,
  offer_id text not null,
  product_category text not null,
  utm_campaign text not null,
  utm_term text,
  clicks integer not null default 0 check (clicks >= 0),
  conversions integer not null default 0 check (conversions >= 0),
  commission numeric(12, 2) not null default 0 check (commission >= 0),
  currency text not null default 'USD',
  status text not null default 'estimated' check (status in ('estimated', 'confirmed')),
  created_at timestamptz not null default now()
);

create index if not exists fitness_affiliate_revenue_date_idx on public.fitness_affiliate_revenue (revenue_date desc);
create index if not exists fitness_affiliate_revenue_calculator_idx on public.fitness_affiliate_revenue (calculator);
create index if not exists fitness_affiliate_revenue_offer_idx on public.fitness_affiliate_revenue (offer_id);
create index if not exists fitness_affiliate_revenue_lang_idx on public.fitness_affiliate_revenue (lang);

alter table public.fitness_affiliate_revenue enable row level security;

alter table public.fitness_affiliate_revenue
  add constraint fitness_affiliate_revenue_unique_import_key
  unique (revenue_date, lang, calculator, affiliate_platform, offer_id, utm_campaign, utm_term);
