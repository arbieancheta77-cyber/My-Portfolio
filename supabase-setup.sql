-- Run once in Supabase: SQL Editor > New query.
-- Replace YOUR_LOGIN_EMAIL (3 places) with the email of your Supabase auth user.

create table if not exists site_content (
  id text primary key,
  data jsonb not null
);

alter table site_content enable row level security;

create policy "Anyone can read site content"
  on site_content for select
  using (true);

create policy "Only the owner can write site content"
  on site_content for all
  to authenticated
  using (auth.jwt() ->> 'email' = 'YOUR_LOGIN_EMAIL')
  with check (auth.jwt() ->> 'email' = 'YOUR_LOGIN_EMAIL');

-- Public bucket: anyone can view images, only the owner can upload.
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "Only the owner can upload images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio' and auth.jwt() ->> 'email' = 'YOUR_LOGIN_EMAIL');
