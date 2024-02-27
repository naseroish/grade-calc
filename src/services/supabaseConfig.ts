import dotenv from "dotenv";
dotenv.config();
import { createClient, SupabaseClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = process.env.VITE_SUPABASE_KEY as string;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);