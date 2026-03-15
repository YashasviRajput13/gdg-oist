import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://hprekkidvyegjgimokxl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcmVra2lkdnllZ2pnaW1va3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTIxMTQsImV4cCI6MjA4NjkyODExNH0.hOGGpuwf9H330LYX5fL_4Y1h_6fMBnp5awFoJ_73YUA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkSubmissions() {
    console.log("Checking tables...");

    // Check events table
    const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("count");
    console.log("Events check:", { eventData, eventError });

    // Check contact_submissions table
    const { data: contactData, error: contactError } = await supabase
        .from("contact_submissions")
        .select("count");
    console.log("Contact Submissions check:", { contactData, contactError });

    // Try to insert a test record
    console.log("Attempting to insert test record into contact_submissions...");
    const { data: insertData, error: insertError } = await supabase
        .from("contact_submissions")
        .insert([
            { name: "Debug Test", email: "debug@test.com", message: "This is a test message from debug script." }
        ])
        .select();

    if (insertError) {
        console.error("Insert Error:", JSON.stringify(insertError, null, 2));
    } else {
        console.log("Insert Success:", insertData);
    }
}

checkSubmissions();
