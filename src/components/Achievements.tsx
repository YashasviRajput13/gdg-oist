import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Target, Rocket, Heart } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Google I/O Extended",
    description: "Successfully hosted Google I/O Extended events with 200+ attendees each year.",
    gradient: "from-[hsl(217,89%,61%)] to-[hsl(217,89%,45%)]",
  },
  {
    icon: Target,
    title: "Solution Challenge",
    description: "Multiple teams from OIST have participated in the global Google Solution Challenge.",
    gradient: "from-[hsl(7,81%,56%)] to-[hsl(7,81%,42%)]",
  },
  {
    icon: Rocket,
    title: "DevFest 2025",
    description: "Organized the biggest DevFest in central India with hands-on workshops and talks.",
    gradient: "from-[hsl(43,96%,50%)] to-[hsl(43,96%,38%)]",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "Helped 100+ students land tech internships through skill-building programs.",
    gradient: "from-[hsl(142,53%,43%)] to-[hsl(142,53%,30%)]",
  },
];

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headingWords = ["Our", "achievements"];

  return (
    <section className="section-padding bg-card relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
          >
            Milestones
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group flex gap-6 p-8 rounded-2xl bg-background border border-border hover:shadow-xl transition-all duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                whileHover={{ rotateY: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
              >
                <item.icon className="text-primary-foreground" size={24} strokeWidth={1.5} />
              </motion.div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
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
