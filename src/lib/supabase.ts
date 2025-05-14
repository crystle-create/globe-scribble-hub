
import { createClient } from '@supabase/supabase-js';

// Replace these values with your actual Supabase project credentials
const supabaseUrl = 'https://your-supabase-project-id.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

if (!supabaseUrl === 'https://your-supabase-project-id.supabase.co' || 
    supabaseAnonKey === 'your-supabase-anon-key') {
  console.error('Please update your Supabase credentials in src/lib/supabase.ts');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This is used to verify if a user is an admin
export const ADMIN_EMAIL = "cloudiblogg@gmail.com";
export const isAdminEmail = (email: string | null) => email === ADMIN_EMAIL;
