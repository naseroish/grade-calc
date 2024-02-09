import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = '';
const supabaseAnonKey = '';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
