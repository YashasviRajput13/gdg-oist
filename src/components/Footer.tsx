const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-google-blue" />
                <span className="w-2.5 h-2.5 rounded-full bg-google-red" />
                <span className="w-2.5 h-2.5 rounded-full bg-google-yellow" />
                <span className="w-2.5 h-2.5 rounded-full bg-google-green" />
              </div>
              <span className="font-display font-bold text-foreground">
                GDG OIST Bhopal
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building a vibrant developer community at Oriental Institute of
              Science & Technology, Bhopal.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <div className="space-y-3">
              {["About", "Events", "Team", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="https://gdg.community.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GDG Community Portal
              </a>
              <a
                href="https://developers.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Google Developers
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GDG OIST Bhopal. Not affiliated with
            Google Inc.
          </p>
          <div className="flex gap-1 text-xs text-muted-foreground">
            Made with{" "}
            <span className="google-dot-red">♥</span>{" "}
            in Bhopal
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
