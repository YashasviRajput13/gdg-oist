import { motion } from "framer-motion";

const technologies = [
  "Android", "Firebase", "TensorFlow", "Flutter", "Google Cloud", "Kotlin",
  "Angular", "Dart", "Gemini AI", "Chrome", "Go", "Kubernetes",
  "Android", "Firebase", "TensorFlow", "Flutter", "Google Cloud", "Kotlin",
  "Angular", "Dart", "Gemini AI", "Chrome", "Go", "Kubernetes",
];

const colors = [
  "bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green",
];

const TechMarquee = () => {
  return (
    <section className="py-16 overflow-hidden bg-card border-y border-border">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
          Technologies We Explore
        </p>
      </motion.div>

      {/* Row 1 - scroll left */}
      <div className="relative">
        <div className="flex animate-marquee-left gap-6 mb-6">
          {technologies.map((tech, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-background hover:shadow-md transition-shadow cursor-default"
            >
              <span className={`w-2 h-2 rounded-full ${colors[i % colors.length]}`} />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{tech}</span>
            </div>
          ))}
        </div>

        {/* Row 2 - scroll right */}
        <div className="flex animate-marquee-right gap-6">
          {[...technologies].reverse().map((tech, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-background hover:shadow-md transition-shadow cursor-default"
            >
              <span className={`w-2 h-2 rounded-full ${colors[(i + 2) % colors.length]}`} />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{tech}</span>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default TechMarquee;
