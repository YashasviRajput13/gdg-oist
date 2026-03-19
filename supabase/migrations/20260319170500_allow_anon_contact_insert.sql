-- Migration: Allow anonymous users to insert contact submissions
-- This allows random visitors to submit a message from the contact form.

CREATE POLICY "Enable insert for anonymous users on contact_submissions" 
ON "public"."contact_submissions" 
FOR INSERT 
WITH CHECK (true);
