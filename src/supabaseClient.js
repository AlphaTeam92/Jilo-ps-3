import { createClient } from '@supabase/supabase-js';

// Retrieve the Supabase URL and Anon Key from environment variables.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing! Supabase features will be disabled.');
}

// Initialize the Supabase client (only if env vars are present)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
