
CREATE TABLE public.event_highlights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.event_highlights ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view event highlights"
ON public.event_highlights FOR SELECT
TO anon, authenticated
USING (true);

-- Admin insert
CREATE POLICY "Admins can insert event highlights"
ON public.event_highlights FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin update
CREATE POLICY "Admins can update event highlights"
ON public.event_highlights FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin delete
CREATE POLICY "Admins can delete event highlights"
ON public.event_highlights FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Seed with existing data
INSERT INTO public.event_highlights (image_url, label, display_order) VALUES
('https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop', 'DevFest ''24', 1),
('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop', 'Tech Talk', 2),
('https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop', 'Hackathon', 3),
('https://images.unsplash.com/photo-1591115765373-520b7a2172a7?q=80&w=2070&auto=format&fit=crop', 'Workshop', 4),
('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop', 'Social', 5),
('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop', 'Innovation', 6);
