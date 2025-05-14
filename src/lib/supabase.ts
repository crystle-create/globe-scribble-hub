
import { createClient } from '@supabase/supabase-js';

// Use the correct Supabase project URL and anon key
const supabaseUrl = 'https://cglwhyeqzflstkjxuagk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbHdoeWVxemZsc3Rranh1YWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxOTc5NDMsImV4cCI6MjA2Mjc3Mzk0M30.NarMtHkQoYcDE6KRYcU-y5ehMah9R7RMv7sCITrPySM';

// We'll update the condition to check for empty strings instead
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Please update your Supabase credentials in src/lib/supabase.ts');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This is used to verify if a user is an admin
export const ADMIN_EMAIL = "cloudiblogg@gmail.com";
export const isAdminEmail = (email: string | null) => email === ADMIN_EMAIL;
