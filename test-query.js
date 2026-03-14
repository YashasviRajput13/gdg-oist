import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://hprekkidvyegjgimokxl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcmVra2lkdnllZ2pnaW1va3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTIxMTQsImV4cCI6MjA4NjkyODExNH0.hOGGpuwf9H330LYX5fL_4Y1h_6fMBnp5awFoJ_73YUA'
);

async function main() {
    console.log("Testing exact frontend query...");
    const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, role, avatar_initials, quote, rating, color_index")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });

    console.log("Error:", error);
    console.log("Data Length:", data ? data.length : 0);
    console.log("Data:", JSON.stringify(data, null, 2));
}

main();
