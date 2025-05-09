# Authentication and Profile Creation Flow

## Overview

When a new user signs up through Supabase Auth, we automatically create a corresponding profile record in our database. This document explains the flow and setup.

## Database Setup

### Profiles Table

The profiles table stores user information and is automatically populated when a new user signs up. Here's the schema:

```sql
create table public.profiles (
    id uuid primary key references auth.users on delete cascade,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(255) not null unique,
    avatar_url varchar(1024),
    onboarding_completed boolean not null default false,
    role varchar(50) not null default 'member',
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);
```

### Automatic Profile Creation

We use a database trigger to automatically create a profile when a new user signs up. Here's the trigger setup:

```sql
-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.profiles (id, email, first_name, last_name, onboarding_completed, role, created_at, updated_at)
    values (
        new.id,
        new.email,
        coalesce(split_part(new.raw_user_meta_data->>'full_name', ' ', 1), ''),
        coalesce(split_part(new.raw_user_meta_data->>'full_name', ' ', 2), ''),
        false,
        'member',
        now(),
        now()
    );
    return new;
end;
$$;

-- Trigger to call the function when a new user is created
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
```

## Flow Description

1. **User Sign Up**

   - User signs up through Supabase Auth
   - Supabase creates a new record in `auth.users`

2. **Trigger Activation**

   - The `on_auth_user_created` trigger fires automatically
   - The `handle_new_user()` function is called

3. **Profile Creation**

   - A new record is created in the `profiles` table
   - Basic user information is populated:
     - ID (from auth.users)
     - Email
     - First name (if available in metadata)
     - Last name (if available in metadata)
     - Default role ('member')
     - Onboarding status (false)

4. **Post-Creation**
   - User is redirected to the application
   - Profile can be updated through the application interface

## Troubleshooting

If you encounter the error: `Database error saving new user`, check:

1. The trigger exists in the database
2. The profiles table exists with the correct schema
3. The database user has necessary permissions

To verify the trigger:

```sql
-- Check if trigger exists
select * from pg_trigger where tgname = 'on_auth_user_created';

-- Check if function exists
select * from pg_proc where proname = 'handle_new_user';
```

## Security Notes

- The trigger function uses `security definer` to ensure it has necessary permissions
- The profiles table is linked to auth.users with a foreign key constraint
- Cascade deletion is enabled (if a user is deleted from auth.users, their profile is also deleted)

---
