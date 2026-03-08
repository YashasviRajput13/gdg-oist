import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";

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
    const authHeader = req.headers.get("Authorization");
    console.log("Auth header present:", !!authHeader);
    
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    console.log("URL present:", !!supabaseUrl, "Anon present:", !!supabaseAnonKey, "Service present:", !!supabaseServiceKey);

    // Verify the caller is an admin using their JWT
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    console.log("User:", user?.id, "Error:", userError?.message);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify admin role using service role client
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: roles, error: roleError } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    console.log("Roles:", roles, "Role error:", roleError?.message);

    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const email = body?.email;
    console.log("Email:", email);
    
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check for existing unused invite
    const { data: existing, error: existErr } = await adminClient
      .from("admin_invites")
      .select("id, token")
      .eq("email", email.toLowerCase().trim())
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .limit(1);

    console.log("Existing invites:", existing, "Error:", existErr?.message);

    let token: string;

    if (existing && existing.length > 0) {
      token = existing[0].token;
    } else {
      const { data: invite, error: insertError } = await adminClient
        .from("admin_invites")
        .insert({ email: email.toLowerCase().trim(), invited_by: user.id })
        .select("token")
        .single();

      console.log("Insert result:", invite, "Error:", insertError?.message);

      if (insertError || !invite) {
        return new Response(JSON.stringify({ error: "Failed to create invite", detail: insertError?.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      token = invite.token;
    }

    const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/$/, "") || "";
    const inviteLink = `${origin}/admin/signup?token=${token}`;

    return new Response(
      JSON.stringify({ success: true, inviteLink, message: `Invite created for ${email}. Share this link with them.` }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(JSON.stringify({ error: "Internal server error", detail: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
