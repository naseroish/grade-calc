// supabaseService.js

// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Create a new Supabase client instance
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_API_KEY');

// Define your Supabase service functions
export const fetchUsers = async () => {
    // Fetch users from the 'users' table
    const { data, error } = await supabase.from('users').select('*');
    
    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }
    
    return data;
};

export const createUser = async (user) => {
    // Insert a new user into the 'users' table
    const { data, error } = await supabase.from('users').insert(user);
    
    if (error) {
        console.error('Error creating user:', error);
        return null;
    }
    
    return data[0];
};

// Export the Supabase client instance
export default supabase;