-- Fix RLS policies for contact_submissions table
-- This allows anonymous users to insert contact form submissions

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Users can view all contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Users can update their own contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Users can delete their own contact submissions" ON contact_submissions;

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create INSERT policy for anonymous users
CREATE POLICY "Allow anonymous insert" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create SELECT policy for authenticated users (admin)
CREATE POLICY "Allow authenticated select" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create UPDATE policy for authenticated users (admin)
CREATE POLICY "Allow authenticated update" ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create DELETE policy for authenticated users (admin)
CREATE POLICY "Allow authenticated delete" ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON contact_submissions TO authenticated;
GRANT SELECT, INSERT ON contact_submissions TO anon;
