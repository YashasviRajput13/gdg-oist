import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  { name: "Android", emoji: "🤖" },
  { name: "Firebase", emoji: "🔥" },
  { name: "TensorFlow", emoji: "🧠" },
  { name: "Flutter", emoji: "💙" },
  { name: "Google Cloud", emoji: "☁️" },
  { name: "Kotlin", emoji: "🎯" },
  { name: "Angular", emoji: "🔺" },
  { name: "Dart", emoji: "🎪" },
  { name: "Gemini AI", emoji: "✨" },
  { name: "Chrome", emoji: "🌐" },
  { name: "Go", emoji: "🐹" },
  { name: "Kubernetes", emoji: "⚓" },
  { name: "Android", emoji: "🤖" },
  { name: "Firebase", emoji: "🔥" },
  { name: "TensorFlow", emoji: "🧠" },
  { name: "Flutter", emoji: "💙" },
  { name: "Google Cloud", emoji: "☁️" },
  { name: "Kotlin", emoji: "🎯" },
  { name: "Angular", emoji: "🔺" },
  { name: "Dart", emoji: "🎪" },
  { name: "Gemini AI", emoji: "✨" },
  { name: "Chrome", emoji: "🌐" },
  { name: "Go", emoji: "🐹" },
  { name: "Kubernetes", emoji: "⚓" },
];

const colors = [
  "bg-google-blue/10 border-google-blue/20 text-google-blue",
  "bg-google-red/10 border-google-red/20 text-google-red",
  "bg-google-yellow/10 border-google-yellow/20 text-google-yellow",
  "bg-google-green/10 border-google-green/20 text-google-green",
];

const dotColors = ["bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green"];

const TechMarquee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 overflow-hidden bg-card border-y border-border relative" ref={ref}>
      {/* Background decoration */}
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

      {/* Row 1 - scroll left */}
      <div className="relative">
        <div className="flex animate-marquee-left gap-4 mb-4">
          {technologies.map((tech, i) => (
            <div
              key={`r1-${i}`}
              className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full border ${colors[i % colors.length]} bg-background/80 hover:scale-105 transition-transform cursor-default`}
            >
              <span className="text-base">{tech.emoji}</span>
              <span className="text-sm font-semibold whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2 - scroll right */}
        <div className="flex animate-marquee-right gap-4">
          {[...technologies].reverse().map((tech, i) => (
            <div
              key={`r2-${i}`}
              className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full border ${colors[(i + 2) % colors.length]} bg-background/80 hover:scale-105 transition-transform cursor-default`}
            >
              <span className="text-base">{tech.emoji}</span>
              <span className="text-sm font-semibold whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default TechMarquee;
