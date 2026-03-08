
DROP POLICY "Anyone can validate invite by token" ON public.admin_invites;

-- Create a function to validate invite tokens (security definer to bypass RLS)
CREATE OR REPLACE FUNCTION public.validate_invite_token(_token text)
RETURNS TABLE(id uuid, email text, used boolean, expires_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ai.id, ai.email, ai.used, ai.expires_at
  FROM public.admin_invites ai
  WHERE ai.token = _token
    AND ai.used = false
    AND ai.expires_at > now()
  LIMIT 1;
$$;

-- Function to mark invite as used and assign admin role
CREATE OR REPLACE FUNCTION public.use_invite_token(_token text, _user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _invite_id uuid;
BEGIN
  SELECT ai.id INTO _invite_id
  FROM public.admin_invites ai
  WHERE ai.token = _token
    AND ai.used = false
    AND ai.expires_at > now();

  IF _invite_id IS NULL THEN
    RETURN false;
  END IF;

  UPDATE public.admin_invites SET used = true WHERE id = _invite_id;
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN true;
END;
$$;
