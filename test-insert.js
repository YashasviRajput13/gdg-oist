import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://hprekkidvyegjgimokxl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcmVra2lkdnllZ2pnaW1va3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTIxMTQsImV4cCI6MjA4NjkyODExNH0.hOGGpuwf9H330LYX5fL_4Y1h_6fMBnp5awFoJ_73YUA'
);

async function main() {
    console.log("Testing insert into contact_submissions...");
    const { data, error } = await supabase
        .from("contact_submissions")
        .insert({
            name: "Test User",
            email: "test@example.com",
            message: "Hello world"
        })
        .select();

    console.log("Error:", error);
    console.log("Data inserted:", data);
}

main();
