import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import SectionTransition from "@/components/SectionTransition";
import OrganicDivider from "@/components/OrganicDivider";
import CursorGlow from "@/components/CursorGlow";
import { WebGLErrorBoundary } from "@/components/WebGLErrorBoundary";

// Lazy-load below-the-fold sections to reduce initial bundle
const TechMarquee = lazy(() => import("@/components/TechMarquee"));
const About = lazy(() => import("@/components/About"));
const Events = lazy(() => import("@/components/Events"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Gallery = lazy(() => import("@/components/Gallery"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Team = lazy(() => import("@/components/Team"));
const FAQ = lazy(() => import("@/components/FAQ"));
const CTABanner = lazy(() => import("@/components/CTABanner"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const Aurora = lazy(() => import("@/components/Aurora"));


const SESSION_KEY = "gdg_loaded";

const Index = () => {
  const [loading, setLoading] = useState(() => {
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
    <div className="min-h-screen bg-background grain-overlay">
      {/* Fixed Aurora WebGL background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <WebGLErrorBoundary>
          <Suspense fallback={null}>
            <Aurora
              colorStops={['#4285F4', '#34A853', '#EA4335']}
              amplitude={1.2}
              blend={0.6}
              speed={0.5}
            />
          </Suspense>
        </WebGLErrorBoundary>
      </div>
      <CursorGlow />
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Navbar />
            <Hero />

            <Suspense fallback={<div className="min-h-[200px]" />}>
              {/* Organic wave transition from Hero to Marquee */}
              <OrganicDivider variant="wave" color="--card" />

              <SectionTransition>
                <TechMarquee />
              </SectionTransition>

              <OrganicDivider variant="curve" flip color="--card" />

              <SectionTransition delay={0.05}>
                <About />
              </SectionTransition>

              <OrganicDivider variant="blob" color="--background" />

              <SectionTransition delay={0.05}>
                <Events />
              </SectionTransition>

              <OrganicDivider variant="wave" flip color="--background" />

              <SectionTransition delay={0.05}>
                <Gallery />
              </SectionTransition>

              <OrganicDivider variant="curve" color="--card" />

              <SectionTransition delay={0.05}>
                <Achievements />
              </SectionTransition>

              <OrganicDivider variant="blob" flip color="--background" />

              <SectionTransition delay={0.05}>
                <Testimonials />
              </SectionTransition>

              <OrganicDivider variant="curve" flip color="--background" />

              <SectionTransition delay={0.05}>
                <Team />
              </SectionTransition>

              <OrganicDivider variant="wave" color="--background" />

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
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
