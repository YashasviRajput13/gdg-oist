import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", alt: "Tech conference keynote", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop", alt: "Team collaboration workshop", span: "" },
  { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop", alt: "Group discussion session", span: "" },
  { src: "https://images.unsplash.com/photo-1591115765373-5f9cf1da241d?w=400&h=500&fit=crop", alt: "Hackathon coding session", span: "md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop", alt: "Speaker presentation", span: "" },
  { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=300&fit=crop", alt: "Networking event", span: "md:col-span-2" },
  { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop", alt: "Workshop hands-on", span: "" },
  { src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=300&fit=crop", alt: "Community meetup", span: "" },
];

const Gallery = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingWords = ["Moments", "from", "our", "events"];

  return (
    <section id="gallery" className="section-padding" ref={sectionRef}>
      <div className="max-w-7xl mx-auto" ref={ref}>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, zIndex: 10, rotateY: 5 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="absolute bottom-4 left-4 right-4 text-sm font-medium text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              >
                {img.alt}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
