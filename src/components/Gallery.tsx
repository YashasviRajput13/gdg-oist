import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap } from "lucide-react";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=600&fit=crop",
    alt: "Keynote speaker",
    caption: "Inspiring Voices to Elevate Your Career 🚀",
    style: { gridColumn: "1 / 3", gridRow: "1 / 4" },
    rotate: -2,
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200&fit=crop",
    alt: "Workshop session",
    style: { gridColumn: "3 / 5", gridRow: "1 / 2" },
    rotate: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=400&fit=crop",
    alt: "Panel discussion",
    caption: "Guidance from Industry Leaders ⚡",
    style: { gridColumn: "5 / 8", gridRow: "1 / 3" },
    rotate: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=250&h=300&fit=crop",
    alt: "Networking event",
    style: { gridColumn: "8 / 10", gridRow: "1 / 3" },
    rotate: -1,
  },
  {
    src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=400&fit=crop",
    alt: "Hackathon coding",
    style: { gridColumn: "10 / 12", gridRow: "1 / 4" },
    rotate: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1591115765373-5f9cf1da241d?w=400&h=500&fit=crop",
    alt: "Hands-on workshop",
    style: { gridColumn: "3 / 5", gridRow: "2 / 5" },
    rotate: -1,
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=250&fit=crop",
    alt: "Group photo",
    style: { gridColumn: "5 / 7", gridRow: "3 / 5" },
    rotate: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=250&fit=crop",
    alt: "Award ceremony",
    style: { gridColumn: "7 / 9", gridRow: "3 / 5" },
    rotate: -2,
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    alt: "Tech showcase",
    caption: "Unlock Your Potential with Industry Experts ⚡",
    style: { gridColumn: "9 / 12", gridRow: "3 / 5" },
    rotate: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=250&fit=crop",
    alt: "Community meetup",
    style: { gridColumn: "1 / 3", gridRow: "4 / 5" },
    rotate: 3,
  },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              key={i}
              initial={{ opacity: 0, scale: 0.85, rotate: item.rotate * 2 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: item.rotate } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
              style={{ ...item.style, transformStyle: "preserve-3d" }}
            >
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
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
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
