import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
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

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}

            {/* Dark mode toggle - pill switch */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative w-16 h-8 rounded-full border border-border bg-muted/60 backdrop-blur-sm transition-colors duration-300 focus:outline-none"
                aria-label="Toggle dark mode"
              >
                <Sun size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-yellow-500" />
                <Moon size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <motion.div
                  className="absolute top-1 w-6 h-6 rounded-full bg-yellow-400 dark:bg-slate-600 shadow-md"
                  animate={{ left: theme === "dark" ? "calc(100% - 28px)" : "4px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            )}

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              Join Us
            </motion.a>
          </div>

          {/* Mobile: dark mode + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative w-14 h-7 rounded-full border border-border bg-muted/60 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                <Sun size={12} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-yellow-500" />
                <Moon size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <motion.div
                  className="absolute top-0.5 rounded-full bg-yellow-400 dark:bg-slate-600 shadow-md"
                  style={{ width: 22, height: 22 }}
                  animate={{ left: theme === "dark" ? "calc(100% - 25px)" : "3px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
              aria-label="Toggle menu"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`block text-base font-medium transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block mt-4 px-5 py-3 rounded-full bg-primary text-primary-foreground text-center text-sm font-semibold"
              >
                Join Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
