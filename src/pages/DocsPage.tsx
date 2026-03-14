import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowLeft, BookOpen, Server, Layers, Shield, Database, Zap, Palette, Sparkles, Wrench, Layout, Menu, X } from "lucide-react";

interface DocSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

interface SidebarGroup {
  label: string;
  items: { id: string; title: string; icon: React.ElementType }[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: "Get Started",
    items: [
      { id: "introduction", title: "Introduction", icon: BookOpen },
      { id: "setup", title: "Local Setup", icon: Wrench },
      { id: "architecture", title: "Architecture", icon: Layers },
    ],
  },
  {
    label: "Features",
    items: [
      { id: "components", title: "Components", icon: Layout },
      { id: "admin", title: "Admin Panel", icon: Shield },
      { id: "animations", title: "Animations & Effects", icon: Sparkles },
    ],
  },
  {
    label: "Backend",
    items: [
      { id: "database", title: "Database Schema", icon: Database },
      { id: "auth", title: "Auth & Security", icon: Shield },
      { id: "edge-functions", title: "Edge Functions", icon: Zap },
    ],
  },
  {
    label: "Design",
    items: [
      { id: "design-system", title: "Design System", icon: Palette },
      { id: "utilities", title: "Utilities & Helpers", icon: Wrench },
    ],
  },
];

const CodeBlock = ({ children, lang = "bash" }: { children: string; lang?: string }) => (
  <pre className="bg-background border border-border rounded-lg p-4 overflow-x-auto text-sm my-4">
    <code className="text-foreground/90 font-mono">{children.trim()}</code>
  </pre>
);

const DocHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-10 mb-4 first:mt-0">{children}</h2>
);

const DocSubheading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-display font-semibold text-foreground mt-8 mb-3">{children}</h3>
);

const DocParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
);

const DocList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 mb-4 ml-4">
    {items.map((item, i) => (
      <li key={i} className="text-muted-foreground flex gap-2">
        <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const DocTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto my-4 border border-border rounded-lg">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/30">
          {headers.map((h, i) => (
            <th key={i} className="text-left px-4 py-3 font-semibold text-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border last:border-0">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 text-muted-foreground">
                <code className="text-xs bg-muted/50 px-1.5 py-0.5 rounded">{cell}</code>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-4 border-google-yellow bg-google-yellow/5 px-4 py-3 rounded-r-lg my-4">
    <p className="text-foreground text-sm">{children}</p>
  </div>
);

// ─── CONTENT SECTIONS ────────────────────────────────────

const IntroductionContent = () => (
  <>
    <DocHeading>Introduction</DocHeading>
    <DocParagraph>
      Welcome to the engineering documentation for the GDG OIST project. This site powers the online presence for
      Google Developer Group (GDG) at OIST Bhopal — a fully dynamic, single-page application built with React.
    </DocParagraph>
    <DocSubheading>Key Features</DocSubheading>
    <DocList items={[
      "Dynamic Content — Events, Galleries, Team Members, and Testimonials fetched live from the database",
      "Admin Dashboard — Protected panel for managing all dynamic content",
      "Invite-Only Admin Access — New admins join via invite tokens from existing admins",
      "Contact Form — Validated submissions with rate limiting and XSS protection",
      "Dark/Light Mode — Full theme support with next-themes",
      "Beautiful Animations — Framer Motion, GSAP, and WebGL effects",
      "Loading Screen — Google-branded dot animation on first visit",
    ]} />
    <DocSubheading>Site Sections</DocSubheading>
    <DocParagraph>The landing page renders the following sections in order:</DocParagraph>
    <DocList items={[
      "Hero — Video background with parallax, animated heading, CTA buttons",
      "TechMarquee — Scrolling technology logos",
      "About — Community stats, four pillars grid",
      "Events — Upcoming events from database",
      "Gallery — Masonry photo gallery from database",
      "Achievements — Milestones via FlowingMenu + CircularGallery",
      "Testimonials — Rotating cards from database",
      "Team — ProfileCards from database",
      "FAQ — Expandable accordion",
      "Contact — Validated contact form",
      "CTABanner — Call-to-action gradient section",
      "Footer — Navigation links and social media",
    ]} />
  </>
);

const SetupContent = () => (
  <>
    <DocHeading>Local Development Setup</DocHeading>
    <DocSubheading>Prerequisites</DocSubheading>
    <DocList items={["Node.js (v18+)", "npm (v9+) or bun"]} />
    <DocSubheading>1. Installation</DocSubheading>
    <CodeBlock>{`cd gdg-oist-crafted
npm install`}</CodeBlock>
    <DocSubheading>2. Environment Configuration</DocSubheading>
    <DocParagraph>Create a .env file in the project root:</DocParagraph>
    <CodeBlock>{`VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsIn...
VITE_SUPABASE_PROJECT_ID=<your-project-id>`}</CodeBlock>
    <Warning>Do not commit your .env file! It should remain ignored by Git.</Warning>
    <DocSubheading>3. Running the Dev Server</DocSubheading>
    <CodeBlock>{`npm run dev`}</CodeBlock>
    <DocParagraph>Vite boots with HMR at http://localhost:5173/</DocParagraph>
    <DocSubheading>4. Building for Production</DocSubheading>
    <CodeBlock>{`npm run build`}</CodeBlock>
    <DocSubheading>5. Project Structure</DocSubheading>
    <CodeBlock lang="text">{`src/
├── assets/          # Static images and video
├── components/      # React components
│   ├── ui/          # shadcn/ui primitives
│   ├── Hero.tsx, About.tsx, Events.tsx ...
├── hooks/           # Custom React hooks
├── integrations/    # Supabase client & types
├── lib/             # Utilities (validation, rate limiting)
├── pages/           # Route pages
│   ├── Index.tsx, AdminLogin.tsx, AdminDashboard.tsx ...
├── App.tsx          # Root component with routing
└── main.tsx         # Entry point`}</CodeBlock>
  </>
);

const ArchitectureContent = () => (
  <>
    <DocHeading>Architecture & Tech Stack</DocHeading>
    <DocSubheading>Frontend</DocSubheading>
    <DocTable
      headers={["Library", "Purpose"]}
      rows={[
        ["React 18 + Vite", "Component-driven UI with fast HMR bundler"],
        ["TypeScript", "Type safety across the entire codebase"],
        ["Tailwind CSS + shadcn/ui", "Utility-first styling with reusable primitives"],
        ["Framer Motion", "Scroll-triggered animations, parallax, transitions"],
        ["GSAP", "Advanced timeline animations (FlowingMenu, ProfileCard, MagicBento)"],
        ["Three.js / OGL", "3D CircularGallery, SplashCursor WebGL effects"],
        ["React Router v6", "Client-side routing (/, /admin/*, /docs)"],
        ["React Query", "Server state caching and data fetching"],
      ]}
    />
    <DocSubheading>Backend (Lovable Cloud)</DocSubheading>
    <DocList items={[
      "PostgreSQL Database — 7 tables for content, auth, and admin management",
      "Row Level Security (RLS) — Fine-grained access control on all tables",
      "Authentication — Email/password auth with role-based access",
      "Edge Functions — Serverless functions for admin invite flow",
      "Database Functions — has_role(), assign_admin_role(), validate_invite_token(), use_invite_token()",
    ]} />
    <DocSubheading>Data Flow</DocSubheading>
    <DocList items={[
      "Component mounts (React lifecycle)",
      "Client queries backend using @supabase/supabase-js",
      "Data returned via REST and deserialized",
      "Component updates state → re-render",
    ]} />
  </>
);

const ComponentsContent = () => (
  <>
    <DocHeading>Components</DocHeading>
    <DocSubheading>Database-Connected</DocSubheading>
    <DocTable
      headers={["Component", "Table", "Description"]}
      rows={[
        ["Events.tsx", "events", "Grid of upcoming GDG events, ordered by date, featured highlighting"],
        ["Gallery.tsx", "gallery_items", "Masonry photo gallery with fallback images"],
        ["Team.tsx", "team_members", "ProfileCards with 3D tilt, ordered by display_order"],
        ["Testimonials.tsx", "testimonials", "Rotating carousel with star ratings, filtered by visibility"],
        ["Contact.tsx", "contact_submissions", "Validated form with rate limiting and XSS protection"],
      ]}
    />
    <DocSubheading>Static Sections</DocSubheading>
    <DocTable
      headers={["Component", "Description"]}
      rows={[
        ["Hero.tsx", "Video background, parallax scroll, 3D word reveal animation"],
        ["About.tsx", "Stats bar (icon + label cards), four pillars grid"],
        ["Achievements.tsx", "FlowingMenu milestones + CircularGallery highlights"],
        ["FAQ.tsx", "Expandable accordion with GDG questions"],
        ["CTABanner.tsx", "Gradient CTA with floating particles"],
        ["TechMarquee.tsx", "Auto-scrolling technology logos"],
        ["Footer.tsx", "Navigation links, social media, admin access"],
      ]}
    />
    <DocSubheading>UI Effect Components</DocSubheading>
    <DocTable
      headers={["Component", "Description"]}
      rows={[
        ["Aurora.tsx", "WebGL shader animated gradient background"],
        ["FloatingBlobs.tsx", "Animated blob decorations with Google colors"],
        ["OrganicDivider.tsx", "SVG section dividers (wave, curve, blob variants)"],
        ["SectionTransition.tsx", "Scroll-triggered fade-in wrapper"],
        ["CursorGlow.tsx", "Mouse-following glow effect"],
        ["LoadingScreen.tsx", "Google-branded dot animation (session-cached)"],
        ["GooeyNav.tsx", "SVG-filtered gooey pill navigation"],
        ["FlowingMenu.tsx", "GSAP hover with marquee text + image reveal"],
        ["CircularGallery.tsx", "Three.js 3D circular image carousel"],
        ["ProfileCard.tsx", "GSAP 3D-tilting team member card"],
        ["MagicBento.tsx", "Particle-effect cards with tilt and magnetism"],
      ]}
    />
  </>
);

const AdminContent = () => (
  <>
    <DocHeading>Admin Panel</DocHeading>
    <DocParagraph>
      The admin panel at /admin provides a protected CMS dashboard. Only users with the admin role can access it.
    </DocParagraph>
    <DocSubheading>Dashboard Tabs</DocSubheading>
    <DocTable
      headers={["Tab", "Capabilities"]}
      rows={[
        ["Gallery", "Add/edit/delete gallery items (image URL, alt text, caption)"],
        ["Events", "CRUD events, featured toggle, bulk actions, quick-edit links"],
        ["Team", "Manage members with name, role, bio, avatar, social links, display order"],
        ["Testimonials", "CRUD testimonials, visibility toggle, star ratings, display order"],
        ["Invite", "Generate invite links for new admins"],
      ]}
    />
    <DocSubheading>Admin Invite Flow</DocSubheading>
    <DocList items={[
      "Existing admin clicks Invite tab → enters new admin's email",
      "Edge function creates invite token (valid 7 days)",
      "Admin copies and shares the invite link",
      "New admin opens link → signs up at /admin/signup?token=...",
      "Token is consumed, admin role assigned automatically",
      "Invite link auto-adapts to current domain (Lovable, Vercel, custom)",
    ]} />
  </>
);

const AnimationsContent = () => (
  <>
    <DocHeading>Animations & Effects</DocHeading>
    <DocSubheading>Framer Motion</DocSubheading>
    <DocList items={[
      "Hero: 3D word reveal (rotateX: 90→0), parallax video, staggered fade-in",
      "Section transitions: useInView-triggered opacity + Y-axis animations",
      "Card hover: 3D tilt (rotateY), scale (1.03), blur reveal",
      "Scroll indicator: Infinite Y bounce at Hero bottom",
      "Loading screen: Three-phase dot animation (bounce → form → exit)",
    ]} />
    <DocSubheading>GSAP</DocSubheading>
    <DocList items={[
      "FlowingMenu: Marquee text scroll + background image clip on hover",
      "ProfileCard: Custom tilt engine with shine overlay",
      "MagicBento: Particle bursts, click ripples, magnetic cursor",
    ]} />
    <DocSubheading>WebGL</DocSubheading>
    <DocList items={[
      "Aurora: Custom vertex/fragment shaders for animated gradient waves",
      "CircularGallery: Three.js 3D carousel on curved cylindrical surface",
      "SplashCursor: OGL fluid simulation cursor trails",
    ]} />
    <DocSubheading>Performance</DocSubheading>
    <DocList items={[
      "Mobile detection disables heavy animations on small screens",
      "useInView with once: true ensures single trigger",
      "GSAP/WebGL contexts properly disposed on unmount",
    ]} />
  </>
);

const DatabaseContent = () => (
  <>
    <DocHeading>Database Schema</DocHeading>
    <DocParagraph>The project uses 7 PostgreSQL tables.</DocParagraph>
    {[
      { name: "events", cols: [["id", "uuid (PK)", "Auto-generated"], ["title", "text", "Event name"], ["description", "text", "Event description"], ["event_date", "timestamptz", "When event occurs"], ["event_type", "text", "Category"], ["location", "text", "Venue"], ["image_url", "text", "Banner image"], ["registration_link", "text", "External URL"], ["is_featured", "boolean", "Highlight flag"]] },
      { name: "gallery_items", cols: [["id", "uuid (PK)", "Auto-generated"], ["src", "text", "Image URL"], ["alt", "text", "Alt text"], ["caption", "text", "Optional caption"]] },
      { name: "team_members", cols: [["id", "uuid (PK)", "Auto-generated"], ["name", "text", "Full name"], ["role", "text", "Title/position"], ["bio", "text", "Biography"], ["avatar_url", "text", "Profile image"], ["linkedin_url / github_url / twitter_url", "text", "Social links"], ["display_order", "integer", "Sort order"], ["category", "text", "Grouping"]] },
      { name: "testimonials", cols: [["id", "uuid (PK)", "Auto-generated"], ["name / role", "text", "Person info"], ["quote", "text", "Testimonial"], ["rating", "integer", "1-5 stars"], ["avatar_initials", "text", "Two-letter initials"], ["color_index", "integer", "Gradient selection"], ["is_visible", "boolean", "Display flag"], ["display_order", "integer", "Sort order"]] },
      { name: "contact_submissions", cols: [["id", "uuid (PK)", "Auto-generated"], ["name", "text", "Sender"], ["email", "text", "Sender email"], ["message", "text", "Content"]] },
      { name: "user_roles", cols: [["id", "uuid (PK)", "Auto-generated"], ["user_id", "uuid (FK)", "References auth.users"], ["role", "app_role", "admin or user"]] },
      { name: "admin_invites", cols: [["id", "uuid (PK)", "Auto-generated"], ["email", "text", "Invited email"], ["token", "text", "Unique token"], ["invited_by", "text", "Admin who invited"], ["used", "boolean", "Consumed flag"], ["expires_at", "timestamptz", "7-day expiry"]] },
    ].map(table => (
      <div key={table.name}>
        <DocSubheading>{table.name}</DocSubheading>
        <DocTable headers={["Column", "Type", "Description"]} rows={table.cols} />
      </div>
    ))}
    <DocSubheading>Database Functions</DocSubheading>
    <DocList items={[
      "has_role(_user_id, _role) → boolean — Check user roles (SECURITY DEFINER)",
      "assign_admin_role(_user_id) — Assign admin role",
      "validate_invite_token(_token) → table — Validate invite tokens",
      "use_invite_token(_token, _user_id) → boolean — Consume token + assign role",
    ]} />
  </>
);

const AuthContent = () => (
  <>
    <DocHeading>Authentication & Security</DocHeading>
    <DocSubheading>Auth Flow</DocSubheading>
    <DocList items={[
      "Admin Login (/admin/login): Email + password → signInWithPassword() → verify admin role → redirect to dashboard",
      "Admin Signup (/admin/signup?token=...): Validate invite token → create account → consume token → assign admin role",
    ]} />
    <DocSubheading>useAdminAuth Hook</DocSubheading>
    <DocParagraph>Located at src/hooks/useAdminAuth.ts — provides secure route protection:</DocParagraph>
    <DocList items={[
      "Uses getUser() for server-side token validation (not just local session)",
      "Verifies admin role from user_roles table",
      "Listens for auth state changes (SIGNED_OUT, TOKEN_REFRESHED)",
      "Auto-redirects unauthorized users to /admin/login",
    ]} />
    <DocSubheading>Security Measures</DocSubheading>
    <DocList items={[
      "Input Validation: Zod schemas on all forms (contact, login, team members)",
      "XSS Prevention: sanitize() escapes HTML entities (&, <, >, \", ')",
      "Rate Limiting: Sliding window — 3 attempts per 60 seconds (contact form, login)",
      "Row Level Security: All tables have RLS with appropriate policies",
      "Roles stored in separate user_roles table (never on profile) to prevent privilege escalation",
    ]} />
  </>
);

const EdgeFunctionsContent = () => (
  <>
    <DocHeading>Edge Functions</DocHeading>
    <DocSubheading>send-admin-invite</DocSubheading>
    <DocParagraph>POST /functions/v1/send-admin-invite — Generates invite tokens for new admins.</DocParagraph>
    <DocSubheading>Request</DocSubheading>
    <CodeBlock lang="json">{`{
  "email": "newadmin@example.com"
}`}</CodeBlock>
    <DocSubheading>Response</DocSubheading>
    <CodeBlock lang="json">{`{
  "success": true,
  "inviteLink": "https://yourdomain.com/admin/signup?token=abc123...",
  "message": "Invite created for newadmin@example.com."
}`}</CodeBlock>
    <DocSubheading>Flow</DocSubheading>
    <DocList items={[
      "Validate Bearer token from Authorization header",
      "Verify requesting user has admin role",
      "Check for existing unused invite for same email (reuse if found)",
      "Create new invite token in admin_invites table",
      "Build invite link using request origin header (auto-adapts to deployment domain)",
    ]} />
    <DocSubheading>Error Codes</DocSubheading>
    <DocTable
      headers={["Status", "Reason"]}
      rows={[
        ["401", "Missing/invalid authorization"],
        ["403", "User lacks admin role"],
        ["400", "Email not provided"],
        ["500", "Internal error"],
      ]}
    />
  </>
);

const DesignSystemContent = () => (
  <>
    <DocHeading>Design System</DocHeading>
    <DocSubheading>Google Brand Colors</DocSubheading>
    <DocTable
      headers={["Name", "Class", "HSL"]}
      rows={[
        ["Blue", "google-blue", "hsl(217, 89%, 61%)"],
        ["Red", "google-red", "hsl(7, 81%, 56%)"],
        ["Yellow", "google-yellow", "hsl(43, 96%, 50%)"],
        ["Green", "google-green", "hsl(142, 53%, 43%)"],
      ]}
    />
    <DocSubheading>Semantic Tokens</DocSubheading>
    <DocList items={[
      "--background / --foreground — Page background and text",
      "--card / --card-foreground — Card surfaces",
      "--primary / --primary-foreground — Primary actions (Google Blue)",
      "--muted / --muted-foreground — Subdued text",
      "--accent / --accent-foreground — Accent highlights",
      "--border — Border colors",
      "--destructive — Error/danger states",
    ]} />
    <DocSubheading>Typography</DocSubheading>
    <DocList items={[
      "font-display — Display/heading font for bold titles",
      "font-body — Body text for paragraphs and UI",
    ]} />
    <DocSubheading>Theme</DocSubheading>
    <DocParagraph>
      Managed by next-themes. Default: dark. Toggle: pill-style switch with Sun/Moon icons in the navbar.
    </DocParagraph>
  </>
);

const UtilitiesContent = () => (
  <>
    <DocHeading>Utilities & Helpers</DocHeading>
    <DocSubheading>Validation (src/lib/validation.ts)</DocSubheading>
    <CodeBlock lang="typescript">{`// Contact form
contactSchema = z.object({
  name: z.string().trim().min(1).max(100).regex(/^[a-zA-Z\\s\\-'.]+$/),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(2000),
});

// Login
loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(128),
});`}</CodeBlock>
    <DocSubheading>Rate Limiting (src/lib/rateLimit.ts)</DocSubheading>
    <CodeBlock lang="typescript">{`const result = checkRateLimit("contact_form", 3, 60_000);
// { allowed: boolean, retryAfterMs: number }`}</CodeBlock>
    <DocParagraph>Sliding window approach with in-memory Map store. Resets on page reload.</DocParagraph>
    <DocSubheading>cn() Utility</DocSubheading>
    <CodeBlock lang="typescript">{`import { cn } from "@/lib/utils";
cn("px-4 py-2", condition && "bg-primary", "px-6");
// Resolves Tailwind class conflicts`}</CodeBlock>
    <DocSubheading>Hooks</DocSubheading>
    <DocList items={[
      "use-mobile.tsx — Detects mobile viewport (< 768px), disables heavy animations",
      "useAdminAuth.ts — Secure admin route protection with server-side validation",
      "use-toast.ts — Toast notifications from shadcn/ui",
    ]} />
  </>
);

// ─── MAP SECTIONS ────────────────────────────────────

const sectionContentMap: Record<string, React.ReactNode> = {
  introduction: <IntroductionContent />,
  setup: <SetupContent />,
  architecture: <ArchitectureContent />,
  components: <ComponentsContent />,
  admin: <AdminContent />,
  animations: <AnimationsContent />,
  database: <DatabaseContent />,
  auth: <AuthContent />,
  "edge-functions": <EdgeFunctionsContent />,
  "design-system": <DesignSystemContent />,
  utilities: <UtilitiesContent />,
};

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeItem = sidebarGroups.flatMap(g => g.items).find(i => i.id === activeSection);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-card border border-border"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border overflow-y-auto z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8 group">
            <ArrowLeft size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="flex gap-1">
              {["bg-google-blue", "bg-google-red", "bg-google-yellow", "bg-google-green"].map(c => (
                <span key={c} className={`w-2 h-2 rounded-full ${c}`} />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">GDG OIST</span>
          </Link>

          <nav className="space-y-6">
            {sidebarGroups.map(group => (
              <div key={group.label}>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${activeSection === item.id
                        ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    >
                      <item.icon size={14} />
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sectionContentMap[activeSection]}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DocsPage;
