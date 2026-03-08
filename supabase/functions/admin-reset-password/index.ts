import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectTo } = await req.json();

    if (!email || typeof email !== "string") {
      // Always return success to prevent enumeration
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check if this email belongs to an admin
    const { data: isAdmin } = await supabaseAdmin.rpc("is_admin_email", {
      _email: email.trim().toLowerCase(),
    });

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ success: false, reason: "not_admin" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Only send reset link for verified admins
    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectTo || undefined,
    });

    if (error) {
      console.error("Reset password error:", error.message);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
