import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cfydprogwkmahwlwgnwu.supabase.co";
const supabaseKey = "sb_publishable_jR69K4ogSsnelZINpjEJqw_WPZKWrYK";

export const supabase = createClient(supabaseUrl, supabaseKey);