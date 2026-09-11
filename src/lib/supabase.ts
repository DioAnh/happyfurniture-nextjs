import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Dùng createClient thông thường cho các tác vụ lấy data công khai
export const supabase = createClient(supabaseUrl, supabaseAnonKey);