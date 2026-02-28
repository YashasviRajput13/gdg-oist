
// The values are pulled from Vite environment variables so they can be
// changed per‑environment and stay out of source control.  Ensure you have a
// `.env` file (ignored by git) with the two keys below:
//
//   VITE_SUPABASE_URL
//   VITE_SUPABASE_PUBLISHABLE_KEY


// Example:
//   VITE_SUPABASE_URL=https://yourproject.supabase.co
//   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJI...

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// 🔍 Debug check (helps catch .env problems)
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);