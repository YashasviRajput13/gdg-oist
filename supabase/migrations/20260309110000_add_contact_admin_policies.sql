-- Add SELECT and DELETE policies for the contact_submissions table
-- so that authenticated admins can retrieve and delete messages in the dashboard.

CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::app_role));
