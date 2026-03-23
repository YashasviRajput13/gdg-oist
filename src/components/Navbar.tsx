import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GooeyNav from "@/components/GooeyNav";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "https://www.linkedin.com/in/gdg-oist-bhopal", external: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const activeIndex = useMemo(() => {
    const idx = navLinks.findIndex(l => l.href.replace("#", "") === activeSection);
    return idx >= 0 ? idx : 0;
  }, [activeSection]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        const sections = navLinks.map((l) => l.href.replace("#", ""));
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.getBoundingClientRect().top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
        ? "bg-card/90 backdrop-blur-xl shadow-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="flex gap-1">
              {["bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green"].map((c) => (
                <span key={c} className={`w-3 h-3 rounded-full ${c} group-hover:scale-110 transition-transform`} />
              ))}
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              GDG OIST Bhopal
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <GooeyNav
              items={navLinks}
              activeIndex={activeIndex}
              particleCount={12}
              particleDistances={[70, 10]}
              particleR={80}
              animationTime={500}
              timeVariance={200}
              colors={[1, 2, 3, 4]}
            />

            <Link
              to="/docs"
              className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>

            <motion.a
              href="https://www.linkedin.com/in/gdg-oist-bhopal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
            >
              Join Us
            </motion.a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-0 left-0 w-full h-[100dvh] z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="bg-card/95 backdrop-blur-xl border-b border-border relative z-50 pointer-events-auto"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                    className="block text-base font-medium"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <Link to="/docs" onClick={() => setIsOpen(false)}>
                  Docs
                </Link>

                <a
                  href="https://www.linkedin.com/in/gdg-oist-bhopal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 px-5 py-3 rounded-full bg-primary text-center"
                >
                  Join Us
                </a>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;