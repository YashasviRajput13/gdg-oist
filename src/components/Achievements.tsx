import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Users, Calendar, Code2 } from "lucide-react";

// Clean, professional SVG icons — consistent 1.5px stroke, no glow
const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M6 9H4a2 2 0 01-2-2V5a1 1 0 011-1h3" />
    <path d="M18 9h2a2 2 0 002-2V5a1 1 0 00-1-1h-3" />
    <path d="M6 4h12v5a6 6 0 01-12 0V4z" />
    <path d="M10 16h4" />
    <path d="M12 15v5" />
    <path d="M8 20h8" />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2c-2 4-4 7-4 11a4 4 0 108 0c0-4-2-7-4-11z" />
    <path d="M12 18v4" />
    <path d="M8 13c-2.5 0-4 1.5-4 3l4 1" />
    <path d="M16 13c2.5 0 4 1.5 4 3l-4 1" />
    <circle cx="12" cy="13" r="1.5" fill="white" stroke="none" opacity="0.5" />
  </svg>
);

const HeartHandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 8c-1.5-2.5-5-3-6.5-1S4 11 12 16c8-5 8.5-7.5 7-9.5s-5-1-7 1.5z" />
    <path d="M4 20h3l2-2" />
    <path d="M20 20h-3l-2-2" />
    <path d="M12 16v4" />
  </svg>
);


const achievements = [
  {
    icon: TrophyIcon,
    title: "Google I/O Extended",
    description: "Successfully hosted Google I/O Extended events with 200+ attendees each year, live-streaming keynotes and running hands-on sessions.",
    gradient: "from-[hsl(217,89%,61%)] to-[hsl(217,89%,45%)]",
    tag: "Annual Event",
  },
  {
    icon: TargetIcon,
    title: "Solution Challenge",
    description: "Multiple teams from OIST have participated in the global Google Solution Challenge, creating impactful solutions for real-world problems.",
    gradient: "from-[hsl(7,81%,56%)] to-[hsl(7,81%,42%)]",
    tag: "Global Program",
  },
  {
    icon: RocketIcon,
    title: "DevFest 2025",
    description: "Organized the biggest DevFest in central India with 20+ speakers, hands-on workshops, and a 24-hour hackathon.",
    gradient: "from-[hsl(43,96%,50%)] to-[hsl(43,96%,38%)]",
    tag: "Flagship Event",
  },
  {
    icon: HeartHandIcon,
    title: "Community Impact",
    description: "Helped 100+ students land tech internships and full-time roles through skill-building programs, resume reviews, and mock interviews.",
    gradient: "from-[hsl(142,53%,43%)] to-[hsl(142,53%,30%)]",
    tag: "Career Growth",
  },
];

const numbers = [
  { icon: Users, value: "500+", label: "Community Members", color: "text-google-blue" },
  { icon: Calendar, value: "50+", label: "Events Hosted", color: "text-google-red" },
  { icon: Code2, value: "20+", label: "Workshops Run", color: "text-google-yellow" },
  { icon: Star, value: "10+", label: "Hackathons Held", color: "text-google-green" },
];

const Achievements = () => {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const headingWords = ["Our", "milestones"];

  return (
    <section className="section-padding bg-card relative overflow-hidden" ref={ref}>
      {/* Organic background decorations */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-primary/5 animate-blob blur-3xl" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-accent/5 animate-blob-reverse blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
          >
            Achievements
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className={`inline-block mr-[0.3em] ${i === 1 ? "text-gradient-google" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground max-w-xl mx-auto font-body"
          >
            From local workshops to global competitions — here's what we've accomplished together.
          </motion.p>
        </motion.div>

        {/* Stats numbers bar */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {numbers.map((num, i) => (
            <motion.div
              key={num.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-center p-6 rounded-3xl bg-background border border-border hover:shadow-lg transition-shadow group"
            >
              <num.icon size={22} className={`${num.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <p className={`font-display text-3xl md:text-4xl font-bold ${num.color} mb-1`}>
                {num.value}
              </p>
              <p className="text-xs text-muted-foreground font-medium">{num.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group flex gap-6 p-8 rounded-3xl bg-background border border-border hover:shadow-xl hover:border-primary/15 transition-all duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                whileHover={{ rotateY: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
              >
                <item.icon />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                    {item.tag}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
