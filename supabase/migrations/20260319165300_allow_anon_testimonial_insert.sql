-- Migration: Allow anonymous users to insert testimonials
-- This allows random visitors to submit a review from the homepage.
-- It will be inserted with is_visible = false by default to require admin approval.

CREATE POLICY "Enable insert for anonymous users" 
ON "public"."testimonials" 
FOR INSERT 
WITH CHECK (true);
