import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  "Android", "Firebase", "TensorFlow", "Flutter", "Google Cloud",
  "Kotlin", "Angular", "Dart", "Gemini AI", "Chrome", "Go", "Kubernetes",
  "Android", "Firebase", "TensorFlow", "Flutter", "Google Cloud",
  "Kotlin", "Angular", "Dart", "Gemini AI", "Chrome", "Go", "Kubernetes",
];

const googleColors = [
  "text-google-blue",
  "text-google-red",
  "text-google-yellow",
  "text-google-green",
];

const TechMarquee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 overflow-hidden bg-card border-y border-border relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
          Technologies We Explore
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Built with <span className="text-gradient-google">Google's ecosystem</span>
        </h3>
      </motion.div>

      <div className="relative">
        <div className="flex animate-marquee-left gap-10 mb-6">
          {technologies.map((tech, i) => (
            <span
              key={`r1-${i}`}
              className={`flex-shrink-0 text-lg md:text-xl font-display font-semibold whitespace-nowrap ${googleColors[i % googleColors.length]} cursor-default hover:opacity-70 transition-opacity`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex animate-marquee-right gap-10">
          {[...technologies].reverse().map((tech, i) => (
            <span
              key={`r2-${i}`}
              className={`flex-shrink-0 text-lg md:text-xl font-display font-semibold whitespace-nowrap ${googleColors[(i + 2) % googleColors.length]} cursor-default hover:opacity-70 transition-opacity`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default TechMarquee;
