import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Users, Lightbulb, Globe } from "lucide-react";

const stats = [
  { value: "500+", label: "Members", color: "bg-google-blue" },
  { value: "50+", label: "Events Hosted", color: "bg-google-red" },
  { value: "20+", label: "Workshops", color: "bg-google-yellow" },
  { value: "10+", label: "Hackathons", color: "bg-google-green" },
];

const pillars = [
  {
    icon: Code,
    title: "Hands-on Learning",
    description: "Workshops and codelabs on cutting-edge Google technologies.",
    dotColor: "bg-google-blue",
  },
  {
    icon: Users,
    title: "Community First",
    description: "A welcoming space for developers of every skill level.",
    dotColor: "bg-google-red",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Hackathons and challenges that push creative boundaries.",
    dotColor: "bg-google-yellow",
  },
  {
    icon: Globe,
    title: "Open Source",
    description: "Contributing to and learning from the global open-source ecosystem.",
    dotColor: "bg-google-green",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            About Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Empowering developers,{" "}
            <span className="text-gradient-google">one event at a time.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            GDG OIST Bhopal is a community-driven group of developers, designers,
            and tech enthusiasts passionate about Google technologies. We believe
            in learning together, building together, and growing together.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative p-8 rounded-2xl bg-background border border-border overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${stat.color}`} />
              <p className="font-display text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
              className="group"
            >
              <div className={`w-3 h-3 rounded-full ${pillar.dotColor} mb-6`} />
              <pillar.icon
                className="text-foreground mb-4"
                size={28}
                strokeWidth={1.5}
              />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
