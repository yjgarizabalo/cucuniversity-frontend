// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from 'src/config-global';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
