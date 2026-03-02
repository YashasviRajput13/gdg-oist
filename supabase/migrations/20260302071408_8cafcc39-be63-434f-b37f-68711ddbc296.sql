
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are publicly readable"
  ON public.gallery_items FOR SELECT
  USING (true);

-- Seed with default gallery images
INSERT INTO public.gallery_items (src, alt, caption) VALUES
  ('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', 'Keynote speaker', 'Inspiring Voices 🚀'),
  ('https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop', 'Workshop session', NULL),
  ('https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop', 'Panel discussion', 'Industry Leaders ⚡'),
  ('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop', 'Networking event', NULL),
  ('https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop', 'Hackathon coding', NULL),
  ('https://images.unsplash.com/photo-1591115765373-5f9cf1da241d?w=600&h=400&fit=crop', 'Hands-on workshop', 'Hands-on Learning 🎯'),
  ('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop', 'Group photo', NULL),
  ('https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop', 'Award ceremony', NULL),
  ('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop', 'Tech showcase', 'Unlock Your Potential ⚡'),
  ('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop', 'Community meetup', NULL);
