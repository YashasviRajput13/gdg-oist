import { supabase } from "@/integrations/supabase/client";

export const testSupabaseConnection = async () => {
  try {
    // Test basic connection
    const { data, error } = await supabase.from('contact_submissions').select('count');
    
    if (error) {
      console.error('Supabase connection error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Supabase connection successful');
    return { success: true, data };
  } catch (err) {
    console.error('Connection test failed:', err);
    return { success: false, error: 'Connection failed' };
  }
};
