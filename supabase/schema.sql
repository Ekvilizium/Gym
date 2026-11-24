-- Run in a dedicated Supabase project. Private per-user snapshots.
create table if not exists public.gym_snapshots (
 user_id uuid primary key references auth.users(id) on delete cascade,
 payload jsonb not null check (jsonb_typeof(payload)='object'),
 revision bigint not null default 1,
 updated_at timestamptz not null default now()
);
alter table public.gym_snapshots enable row level security;
create policy "read own snapshot" on public.gym_snapshots for select to authenticated using (auth.uid()=user_id);
create policy "insert own snapshot" on public.gym_snapshots for insert to authenticated with check (auth.uid()=user_id);
create policy "update own snapshot" on public.gym_snapshots for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "delete own snapshot" on public.gym_snapshots for delete to authenticated using (auth.uid()=user_id);
revoke all on public.gym_snapshots from anon;
grant select,insert,update,delete on public.gym_snapshots to authenticated;
