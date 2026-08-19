-- Run this once in the Supabase SQL editor (project settings > SQL Editor).
-- Creates the bookings + profiles tables and their RLS policies for the admin system.

-- ── profiles ────────────────────────────────────────────────────────────────
-- One row per admin/collaborator, linked 1:1 to an auth.users row.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'collaborator' check (role in ('admin', 'collaborator')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles: read own row"
  on profiles for select
  using (auth.uid() = id);

-- NOTE: don't add a "read all rows for admins" policy here that queries
-- `profiles` from within its own USING clause — Postgres RLS re-evaluates
-- policies on the subquery too, causing "infinite recursion detected in
-- policy for relation profiles". When a colleague-listing admin feature is
-- built, use a SECURITY DEFINER function (which bypasses RLS internally)
-- instead of a self-referential policy.

-- ── bookings ────────────────────────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  customer_name text not null,
  customer_first_name text,
  customer_last_name text,
  customer_email text not null,
  customer_phone text,
  customer_language text,
  items jsonb not null,
  grand_total numeric not null,
  currency text not null default 'USD',
  gclid text,
  payment_link text,
  admin_comment text,
  confirmed_at timestamptz,
  confirmed_by uuid references auth.users(id),
  cancelled_reason text
);

create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_created_at_idx on bookings (created_at desc);

alter table bookings enable row level security;

-- No public policies: the public booking API route uses the service-role
-- client (supabaseAdmin), which bypasses RLS entirely for INSERT.
-- Only authenticated admin/collaborator users can read or update via the
-- session-based server client.
create policy "bookings: staff can read"
  on bookings for select
  using (exists (select 1 from profiles p where p.id = auth.uid()));

create policy "bookings: staff can update"
  on bookings for update
  using (exists (select 1 from profiles p where p.id = auth.uid()));

-- ── first admin user ───────────────────────────────────────────────────────
-- After creating your first user from Authentication > Users in the Supabase
-- dashboard, run this once (replace the UUID with that user's id):
--
-- insert into profiles (id, full_name, role) values ('<user-uuid>', 'Tu Nombre', 'admin');
