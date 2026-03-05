
CREATE POLICY "Admins can insert team members" ON public.team_members FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update team members" ON public.team_members FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete team members" ON public.team_members FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
