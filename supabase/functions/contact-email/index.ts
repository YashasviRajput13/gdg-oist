import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // ✅ Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, message } = await req.json();

    // ✅ Validation
    if (!name || !email || !message) {
      throw new Error("Missing required fields");
    }

    // ✅ Send email (if API key exists)
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "GDG OIST Contact <onboarding@resend.dev>",
          to: ["admin@gdg-oist.com"],
          reply_to: email,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Resend API error:", errorText);
      }
    } else {
      console.log("No RESEND_API_KEY found. Skipping email.");
    }

    // ✅ Success response
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Something went wrong",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});