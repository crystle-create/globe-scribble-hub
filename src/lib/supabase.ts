
import { createClient } from '@supabase/supabase-js';

// Use direct strings for the Supabase URL and anon key since
// the env variables might not be properly set in the environment
const supabaseUrl = 'https://your-supabase-project-id.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This is used to verify if a user is an admin
export const ADMIN_EMAIL = "cloudiblogg@gmail.com";
export const isAdminEmail = (email: string | null) => email === ADMIN_EMAIL;
