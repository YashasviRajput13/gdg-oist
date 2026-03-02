import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
  rotate: number;
  grid_column: string;
  grid_row: string;
}

// Fallback items in case Supabase is empty or fails
const fallbackGalleryItems = [
  {
    id: "fallback-1",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=600&fit=crop",
    alt: "Keynote speaker",
    caption: "Inspiring Voices to Elevate Your Career 🚀",
    grid_column: "1 / 3", grid_row: "1 / 4",
    rotate: -2,
  },
  {
    id: "fallback-2",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200&fit=crop",
    alt: "Workshop session",
    caption: null,
    grid_column: "3 / 5", grid_row: "1 / 2",
    rotate: 1,
  },
  {
    id: "fallback-3",
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=400&fit=crop",
    alt: "Panel discussion",
    caption: "Guidance from Industry Leaders ⚡",
    grid_column: "5 / 8", grid_row: "1 / 3",
    rotate: 2,
  },
  {
    id: "fallback-4",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=250&h=300&fit=crop",
    alt: "Networking event",
    caption: null,
    grid_column: "8 / 10", grid_row: "1 / 3",
    rotate: -1,
  },
  {
    id: "fallback-5",
    src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=400&fit=crop",
    alt: "Hackathon coding",
    caption: null,
    grid_column: "10 / 12", grid_row: "1 / 4",
    rotate: 3,
  },
  {
    id: "fallback-6",
    src: "https://images.unsplash.com/photo-1591115765373-5f9cf1da241d?w=400&h=500&fit=crop",
    alt: "Hands-on workshop",
    caption: null,
    grid_column: "3 / 5", grid_row: "2 / 5",
    rotate: -1,
  },
  {
    id: "fallback-7",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=250&fit=crop",
    alt: "Group photo",
    caption: null,
    grid_column: "5 / 7", grid_row: "3 / 5",
    rotate: 2,
  },
  {
    id: "fallback-8",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=250&fit=crop",
    alt: "Award ceremony",
    caption: null,
    grid_column: "7 / 9", grid_row: "3 / 5",
    rotate: -2,
  },
  {
    id: "fallback-9",
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    alt: "Tech showcase",
    caption: "Unlock Your Potential with Industry Experts ⚡",
    grid_column: "9 / 12", grid_row: "3 / 5",
    rotate: 1,
  },
  {
    id: "fallback-10",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=250&fit=crop",
    alt: "Community meetup",
    caption: null,
    grid_column: "1 / 3", grid_row: "4 / 5",
    rotate: 3,
  },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackGalleryItems);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery_items" as any)
        .select("*")
        .order("created_at", { ascending: true });

      if (data && data.length > 0) {
        setGalleryItems(data as any);
      }
    };

    fetchGallery();
  }, []);

  const headingWords = ["Moments", "from", "our", "events"];

  return (
    <section id="gallery" className="section-padding overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
          >
            Gallery
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* Scattered collage grid */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "repeat(11, 1fr)",
            gridTemplateRows: "repeat(4, 140px)",
          }}
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, x: -120, rotate: item.rotate }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0, rotate: item.rotate } : {}}
              transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-none hover:shadow-2xl transition-all duration-700"
              style={{ gridColumn: item.grid_column, gridRow: item.grid_row, transformStyle: "preserve-3d" }}
            >
              {/* Soft shadow that fades in with the image */}
              <motion.div
                className="absolute -bottom-2 inset-x-2 h-6 rounded-full bg-foreground/10 blur-xl -z-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: [0.42, 0, 0.58, 1] }}
              />
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {item.caption && (
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/80 backdrop-blur-sm text-background text-xs font-semibold shadow-lg">
                    {item.caption}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: simpler 2-column masonry */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {galleryItems.slice(0, 6).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, x: -80 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.42, 0, 0.58, 1] }}
              className={`relative rounded-xl overflow-hidden shadow-md ${i === 0 || i === 3 ? "row-span-2" : ""}`}
              style={{ minHeight: i === 0 || i === 3 ? 280 : 140 }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {item.caption && (
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-foreground/80 text-background text-[10px] font-semibold">
                    {item.caption}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
