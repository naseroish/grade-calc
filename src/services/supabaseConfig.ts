import { createClient, SupabaseClient } from '@supabase/supabase-js';

<<<<<<< HEAD


const supabaseUrl= import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey= import.meta.env.VITE_SUPABASE_KEY;


=======
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY as string;


>>>>>>> fdc0273ea40f29e456181fbf8ba3391289dff26b
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);