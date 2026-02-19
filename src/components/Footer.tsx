import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[hsl(217,89%,61%)] via-[hsl(7,81%,56%)] to-[hsl(142,53%,43%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {["bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green"].map((c, i) => (
                  <motion.span
                    key={c}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 500 }}
                    className={`w-2.5 h-2.5 rounded-full ${c}`}
                  />
                ))}
              </div>
              <span className="font-display font-bold text-foreground">GDG OIST Bhopal</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building a vibrant developer community at Oriental Institute of Science & Technology, Bhopal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-3">
              {["About", "Events", "Gallery", "Team", "Contact"].map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  whileHover={{ x: 6 }}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-3">
              {[
                { label: "GDG Community Portal", href: "https://gdg.community.dev" },
                { label: "Google Developers", href: "https://developers.google.com" },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  whileHover={{ x: 6 }}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GDG OIST Bhopal. Not affiliated with Google Inc.
          </p>
          <div className="flex gap-1 text-xs text-muted-foreground">
            Made with <span className="google-dot-red">♥</span> in Bhopal
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
