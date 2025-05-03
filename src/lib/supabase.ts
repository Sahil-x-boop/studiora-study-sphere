
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nydkrjrenbnkhoqkjzoj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55ZGtyanJlbmJua2hvcWtqem9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMzkxMjgsImV4cCI6MjA2MTgxNTEyOH0.jS6148z_FMEk0J9B3v4GybwSUzcEuSj5xxMGqeGhlSM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
