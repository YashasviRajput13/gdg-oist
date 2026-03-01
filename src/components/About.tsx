import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import FloatingBlobs from "@/components/FloatingBlobs";
import pillarLearning from "@/assets/pillar-learning.png";
import pillarCommunity from "@/assets/pillar-community.png";
import pillarInnovation from "@/assets/pillar-innovation.png";
import pillarOpensource from "@/assets/pillar-opensource.png";

const stats = [
  { value: "500+", label: "Members", color: "bg-google-blue" },
  { value: "50+", label: "Events Hosted", color: "bg-google-red" },
  { value: "20+", label: "Workshops", color: "bg-google-yellow" },
  { value: "10+", label: "Hackathons", color: "bg-google-green" },
];

const pillars = [
  {
    image: pillarLearning,
    title: "Hands-on Learning",
    description: "Workshops and codelabs on cutting-edge Google technologies.",
    gradient: "from-[hsl(217,89%,61%)] to-[hsl(217,89%,45%)]",
  },
  {
    image: pillarCommunity,
    title: "Community First",
    description: "A welcoming space for developers of every skill level.",
    gradient: "from-[hsl(7,81%,56%)] to-[hsl(7,81%,42%)]",
  },
  {
    image: pillarInnovation,
    title: "Innovation",
    description: "Hackathons and challenges that push creative boundaries.",
    gradient: "from-[hsl(43,96%,50%)] to-[hsl(43,96%,38%)]",
  },
  {
    image: pillarOpensource,
    title: "Open Source",
    description: "Contributing to and learning from the global open-source ecosystem.",
    gradient: "from-[hsl(142,53%,43%)] to-[hsl(142,53%,30%)]",
  },
];

const headingWords = ["Empowering", "developers,", "one", "event", "at", "a", "time."];

const About = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="about" className="section-padding bg-card relative overflow-hidden" ref={sectionRef}>
      {/* Organic floating blobs */}
      <FloatingBlobs
        blobs={[
          { color: "bg-primary/5", size: "w-96 h-96", position: "-top-20 -right-20", delay: 0, duration: 22 },
          { color: "bg-accent/5", size: "w-72 h-72", position: "-bottom-10 -left-10", delay: 3, duration: 18 },
        ]}
      />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        {/* Section header with word-by-word reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
          >
            About Us
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-block mr-[0.3em] ${i >= 5 ? "text-gradient-google" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-lg text-muted-foreground font-body leading-relaxed"
          >
            GDG OIST Bhopal is a community-driven group of developers, designers,
            and tech enthusiasts passionate about Google technologies. We believe
            in learning together, building together, and growing together.
          </motion.p>
        </motion.div>

        {/* Stats - count-up style stagger */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.03, rotateY: 5 }}
              className="relative p-8 rounded-2xl bg-background border border-border overflow-hidden group hover:shadow-xl transition-shadow duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${stat.color} transition-all duration-300 group-hover:h-1.5`} />
              <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.12, type: "spring", stiffness: 200 }}
                className="font-display text-4xl md:text-5xl font-bold text-foreground mb-1"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Pillars - 3D card flip in */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 50, rotateX: 25 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group p-7 rounded-2xl bg-background border border-border hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
              style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            >
              <motion.div
                whileHover={{ rotateY: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-5 shadow-lg p-2.5`}
              >
                <img src={pillar.image} alt={pillar.title} className="w-full h-full object-contain" />
              </motion.div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {pillar.description}
              </p>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Learn more <ArrowRight size={12} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
