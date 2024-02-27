import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseUrl: string;
let supabaseAnonKey: string;

if (process.env.NODE_ENV === 'production') {
    // In production (Azure)
    supabaseUrl = process.env.VITE_SUPABASE_URL;
    supabaseAnonKey = process.env.VITE_SUPABASE_KEY;
  } else {
    // In development (local)
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
  }

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
