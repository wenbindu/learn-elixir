-- Run once in the Supabase SQL Editor for the intended project.
create table public.lesson_messages (
  id uuid primary key default gen_random_uuid(),
  lesson text not null check (lesson ~ '^[a-z0-9-]{1,100}$'),
  locale text not null check (locale in ('zh', 'en')),
  body text not null check (length(btrim(body)) between 1 and 1000),
  author_id uuid not null references auth.users(id),
  author_name text not null check (length(author_name) between 1 and 100),
  reply_to uuid,
  created_at timestamptz not null default now(),
  unique (id, lesson, locale),
  foreign key (reply_to, lesson, locale) references public.lesson_messages(id, lesson, locale)
);
create index lesson_messages_timeline on public.lesson_messages (lesson, locale, created_at);

-- Set identity and timestamp on the server, and serialize each author's posts.
create function public.prepare_lesson_message() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Login required'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(auth.uid()::text));
  if exists (select 1 from public.lesson_messages where author_id = auth.uid() and created_at > now() - interval '5 seconds') then
    raise exception 'Please wait before sending another message';
  end if;
  new.author_id := auth.uid();
  new.author_name := left(coalesce(nullif(auth.jwt() -> 'user_metadata' ->> 'user_name', ''), 'User'), 100);
  new.created_at := now();
  return new;
end $$;
create trigger prepare_lesson_message before insert on public.lesson_messages
for each row execute function public.prepare_lesson_message();

alter table public.lesson_messages enable row level security;
revoke all on public.lesson_messages from anon, authenticated;
grant select on public.lesson_messages to anon, authenticated;
grant insert (lesson, locale, body, reply_to) on public.lesson_messages to authenticated;
create policy "Anyone can read lesson messages" on public.lesson_messages for select to anon, authenticated using (true);
create policy "Signed-in users can post" on public.lesson_messages for insert to authenticated with check (author_id = auth.uid());
