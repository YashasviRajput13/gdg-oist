
CREATE TABLE public.admin_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  invited_by uuid NOT NULL,
  used boolean NOT NULL DEFAULT false,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '7 days'),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_invites ENABLE ROW LEVEL SECURITY;

-- Only admins can create invites
CREATE POLICY "Admins can insert invites"
ON public.admin_invites FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can view invites
CREATE POLICY "Admins can view invites"
ON public.admin_invites FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow anonymous users to validate an invite token (for signup page)
CREATE POLICY "Anyone can validate invite by token"
ON public.admin_invites FOR SELECT TO anon
USING (true);
