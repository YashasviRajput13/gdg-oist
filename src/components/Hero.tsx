import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import heroBg from "@/assets/hero-bg.jpg";
import FloatingBlobs from "@/components/FloatingBlobs";

const wordVariants = {
  hidden: { opacity: 0, y: 80, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.5 + i * 0.15,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 1.2 + i * 0.03,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const subtitle = "Join the most vibrant developer community at OIST Bhopal. We host workshops, hackathons, and tech talks powered by Google technologies.";

  const heroWords = [
    { text: "Build.", className: "text-foreground" },
    { text: "Learn.", className: "google-dot-blue" },
    { text: "Grow.", className: "google-dot-red" },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background video with parallax */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroBg}
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </motion.div>

      {/* Organic floating blobs */}
      <FloatingBlobs
        blobs={[
          { color: "bg-google-blue/15", size: "w-80 h-80", position: "top-1/4 -left-24", delay: 0, duration: 18 },
          { color: "bg-google-red/10", size: "w-56 h-56", position: "top-1/3 right-10", delay: 3, duration: 25 },
          { color: "bg-google-green/8", size: "w-96 h-96", position: "bottom-1/4 left-1/3", delay: 1, duration: 30 },
          { color: "bg-google-yellow/12", size: "w-48 h-48", position: "bottom-1/3 right-1/4", delay: 5, duration: 22 },
        ]}
      />

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* GDG Badge - clip reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-md mb-8">
            <div className="flex gap-1">
              {["bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green"].map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 500 }}
                  className={`w-2 h-2 rounded-full ${c}`}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-foreground/80">
              Google Developer Group
            </span>
          </div>
        </motion.div>

        {/* Hero heading - 3D word reveal */}
        <h1
          className="font-display text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8"
          style={{ perspective: "600px" }}
        >
          {heroWords.map((word, i) => (
            <motion.span
              key={word.text}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className={`${word.className} inline-block mr-4`}
              style={{ transformOrigin: "bottom center" }}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle - letter-by-letter reveal */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 font-body leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* CTA buttons - staggered slide up */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#events"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px hsl(217 89% 61% / 0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="group px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 flex items-center gap-2"
          >
            Explore Events
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--secondary))" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full border border-border/50 text-foreground font-semibold text-sm backdrop-blur-sm transition-all duration-300"
          >
            Learn More
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-foreground/40 tracking-widest uppercase">Scroll</span>
          <ArrowDown className="text-foreground/40" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
