import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, CalendarDays, Wrench, Code2 } from "lucide-react";
import FlowingMenu from "./FlowingMenu";
import CircularGallery from "./CircularGallery";
import milestoneIo from "@/assets/milestone-io.jpg";
import milestoneSolution from "@/assets/milestone-solution.jpg";
import milestoneDevfest from "@/assets/milestone-devfest.jpg";
import milestoneCommunity from "@/assets/milestone-community.jpg";

const googleColors = ["bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green"];

const numbers = [
  { icon: Users, label: "Growing Community", color: "text-google-blue", bar: googleColors[0] },
  { icon: CalendarDays, label: "Events Hosted", color: "text-google-red", bar: googleColors[1] },
  { icon: Wrench, label: "Hands-on Workshops", color: "text-google-yellow", bar: googleColors[2] },
  { icon: Code2, label: "Hackathons Organized", color: "text-google-green", bar: googleColors[3] },
];

// Milestone items for FlowingMenu
const milestoneItems = [
  {
    text: "Google I/O Extended",
    link: "#events",
    image: milestoneIo,
  },
  {
    text: "Solution Challenge",
    link: "#events",
    image: milestoneSolution,
  },
  {
    text: "DevFest 2025",
    link: "#events",
    image: milestoneDevfest,
  },
  {
    text: "Community Impact",
    link: "#about",
    image: milestoneCommunity,
  },
];

const galleryItems = [
  { image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop", text: "DevFest '24" },
  { image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop", text: "Tech Talk" },
  { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop", text: "Hackathon" },
  { image: "https://images.unsplash.com/photo-1591115765373-520b7a2172a7?q=80&w=2070&auto=format&fit=crop", text: "Workshop" },
  { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop", text: "Social" },
  { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", text: "Innovation" },
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
              <p className={`font-display text-2xl md:text-3xl font-bold ${num.color} mb-1`}>
                {num.value}
              </p>
              <p className="text-xs text-muted-foreground font-medium">{num.label}</p>
            </motion.div>
          ))}
        </div>

        {/* FlowingMenu milestone items */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="rounded-3xl overflow-hidden border border-border"
        >
          <FlowingMenu
            items={milestoneItems}
            speed={18}
            textColor="hsl(var(--foreground))"
            bgColor="hsl(var(--background))"
            marqueeBgColor="hsl(var(--primary))"
            marqueeTextColor="hsl(var(--primary-foreground))"
            borderColor="hsl(var(--border))"
          />
        </motion.div>

        {/* Circular Gallery for event highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32"
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Event <span className="text-google-blue">Highlights</span>
            </h3>
            <p className="text-muted-foreground mt-2">
              Drag or scroll to explore our recent community gatherings
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border bg-background/50 backdrop-blur-sm">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="hsl(var(--foreground))"
              borderRadius={0.05}
              font="bold 24px Inter"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
