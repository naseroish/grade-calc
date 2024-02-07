import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const authService = {
  signIn: async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) {
        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  // Add other authentication methods (sign-up, sign-out, etc.) here
};