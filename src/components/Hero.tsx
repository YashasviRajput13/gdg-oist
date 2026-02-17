import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="GDG OIST Bhopal hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm md:text-base font-medium tracking-widest uppercase text-muted-foreground mb-6">
            Google Developer Group
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
        >
          <span className="text-foreground">Build.</span>{" "}
          <span className="google-dot-blue">Learn.</span>{" "}
          <span className="google-dot-red">Grow.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body"
        >
          Join the most vibrant developer community at OIST Bhopal. We host
          workshops, hackathons, and tech talks powered by Google technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#events"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Explore Events
          </a>
          <a
            href="#about"
            className="px-8 py-4 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-muted-foreground" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
