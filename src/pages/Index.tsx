import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Achievements from "@/components/Achievements";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import SectionTransition from "@/components/SectionTransition";

const SESSION_KEY = "gdg_loaded";

const Index = () => {
  const [loading, setLoading] = useState(() => {
    // Only show loading screen once per browser session
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [contentVisible, setContentVisible] = useState(
    () => !!sessionStorage.getItem(SESSION_KEY)
  );

  const handleLoadComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setLoading(false);
    setContentVisible(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Loading screen — only first visit per session */}
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Main content fades in after loader */}
      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Navbar />

            {/* Hero has its own internal animations */}
            <Hero />

            {/* Each section wraps in a SectionTransition for scroll reveals */}
            <SectionTransition>
              <TechMarquee />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <About />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <Events />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <Gallery />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <Achievements />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <Team />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <FAQ />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <Contact />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <CTABanner />
            </SectionTransition>

            <SectionTransition delay={0.05}>
              <Footer />
            </SectionTransition>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
