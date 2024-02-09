import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvxkuqxkijsnelolveed.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eGt1cXhraWpzbmVsb2x2ZWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDczNDA3MzQsImV4cCI6MjAyMjkxNjczNH0.IDdKAeYWq3n06qFgFGECeqZy0Cr7AJ1_1dd30yrTOEo';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
