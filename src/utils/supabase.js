import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '';
const supabaseKey = '';

const supabase = createClient(supabaseUrl, supabaseKey);
const storage = supabase.storage;

export { supabase, storage };