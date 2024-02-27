import { createClient, SupabaseClient } from '@supabase/supabase-js';



//if (process.env.NODE_ENV === 'Production') {
  // In production (Azure)
const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = process.env.VITE_SUPABASE_KEY as string;
//} 

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be defined');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);