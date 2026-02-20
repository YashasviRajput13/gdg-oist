import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Target, Rocket, Heart, Star, Users, Calendar, Code2 } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Google I/O Extended",
    description: "Successfully hosted Google I/O Extended events with 200+ attendees each year, live-streaming keynotes and running hands-on sessions.",
    gradient: "from-[hsl(217,89%,61%)] to-[hsl(217,89%,45%)]",
    tag: "Annual Event",
  },
  {
    icon: Target,
    title: "Solution Challenge",
    description: "Multiple teams from OIST have participated in the global Google Solution Challenge, creating impactful solutions for real-world problems.",
    gradient: "from-[hsl(7,81%,56%)] to-[hsl(7,81%,42%)]",
    tag: "Global Program",
  },
  {
    icon: Rocket,
    title: "DevFest 2025",
    description: "Organized the biggest DevFest in central India with 20+ speakers, hands-on workshops, and a 24-hour hackathon.",
    gradient: "from-[hsl(43,96%,50%)] to-[hsl(43,96%,38%)]",
    tag: "Flagship Event",
  },
  {
    icon: Heart,
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
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

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
              className="text-center p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow group"
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="group flex gap-6 p-8 rounded-2xl bg-background border border-border hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                whileHover={{ rotateY: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
              >
                <item.icon className="text-white" size={24} strokeWidth={1.5} />
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
