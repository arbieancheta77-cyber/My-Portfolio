import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Null until .env is filled in; the site then falls back to the built-in content.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
