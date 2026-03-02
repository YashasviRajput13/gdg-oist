import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
}

const fallbackGalleryItems: GalleryItem[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", alt: "Keynote speaker", caption: "Inspiring Voices 🚀" },
  { id: "2", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop", alt: "Workshop session", caption: null },
  { id: "3", src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop", alt: "Panel discussion", caption: "Industry Leaders ⚡" },
  { id: "4", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop", alt: "Networking event", caption: null },
  { id: "5", src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop", alt: "Hackathon coding", caption: null },
  { id: "6", src: "https://images.unsplash.com/photo-1591115765373-5f9cf1da241d?w=600&h=400&fit=crop", alt: "Hands-on workshop", caption: "Hands-on Learning 🎯" },
  { id: "7", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop", alt: "Group photo", caption: null },
  { id: "8", src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop", alt: "Award ceremony", caption: null },
  { id: "9", src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop", alt: "Tech showcase", caption: "Unlock Your Potential ⚡" },
  { id: "10", src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop", alt: "Community meetup", caption: null },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackGalleryItems);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
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

  // Split items into two rows
  const row1 = galleryItems.slice(0, Math.ceil(galleryItems.length / 2));
  const row2 = galleryItems.slice(Math.ceil(galleryItems.length / 2));

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

        {/* Scrolling rows */}
        <div className="flex flex-col gap-5">
          <InfiniteScrollRow items={row1} direction="left" speed={30} isInView={isInView} />
          <InfiniteScrollRow items={row2} direction="right" speed={35} isInView={isInView} />
        </div>
      </div>
    </section>
  );
};

interface InfiniteScrollRowProps {
  items: GalleryItem[];
  direction: "left" | "right";
  speed: number;
  isInView: boolean;
}

const InfiniteScrollRow = ({ items, direction, speed, isInView }: InfiniteScrollRowProps) => {
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  const totalWidth = items.length * 340; // card width + gap estimate

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-5 w-max"
        animate={{
          x: direction === "left" ? [0, -totalWidth] : [-totalWidth, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="relative flex-shrink-0 w-[300px] h-[200px] md:w-[320px] md:h-[220px] rounded-2xl overflow-hidden group cursor-pointer"
            style={{
              boxShadow: "0 8px 32px -8px hsl(var(--foreground) / 0.1), 0 2px 8px -2px hsl(var(--foreground) / 0.06)",
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {item.caption && (
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground text-xs font-semibold shadow-lg">
                  {item.caption}
                </span>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Gallery;
