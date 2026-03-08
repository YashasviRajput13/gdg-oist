
CREATE TABLE public.login_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  user_id uuid,
  success boolean NOT NULL DEFAULT false,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.login_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view login history"
  ON public.login_history
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert login history"
  ON public.login_history
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX idx_login_history_created_at ON public.login_history (created_at DESC);
