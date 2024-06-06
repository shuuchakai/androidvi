import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'Your URL';
const supabaseKey = 'Your KEY';

const supabase = createClient(supabaseUrl, supabaseKey);
const storage = supabase.storage;

export { supabase, storage };