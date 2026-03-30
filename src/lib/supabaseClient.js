import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qnaogqcdrndbhvxxpyzw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_n0OfOcvZVH-rEYe3fuYzFQ_xx4RMtaR';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
