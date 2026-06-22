import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Download, Upload, User, Sparkles } from "lucide-react";
import { toPng } from "html-to-image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TRACKS = [
  "AI/ML",
  "Web Dev",
  "Android",
  "Cloud",
  "Open Source",
  "UI/UX",
  "Beginner Track",
  "DSA/CP",
] as const;

const BRANCHES = [
  "CSE",
  "CSE-AIML",
  "CSE-DS",
  "IT",
  "ECE",
  "EX",
  "ME",
  "CE",
  "MBA",
  "Other",
] as const;

const YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
] as const;

/** Export-safe system font stack — no external font fetches */
const CARD_FONT =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const MemberCardGenerator = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [name, setName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [track, setTrack] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [downloading, setDownloading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        skipFonts: true,
        fontEmbedCSS: "",
      });
      const link = document.createElement("a");
      link.download = `gdg-oist-card-${(name || "community").replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate card image:", err);
    } finally {
      setDownloading(false);
    }
  }, [name, downloading]);

  const displayName = name || "Your Name";
  const displayTrack = track || "Your Track";

  const displayBranch = useMemo(() => {
    const b = selectedBranch || "Branch";
    const y = selectedYear || "Year";
    if (!selectedBranch && !selectedYear) return "Branch • Year";
    return `${b} • ${y}`;
  }, [selectedBranch, selectedYear]);

  const joinedDate = useMemo(() => {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community-card"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
            <Sparkles size={12} />
            Community Badge
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Create Your{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--google-blue))] via-[hsl(var(--google-red))] to-[hsl(var(--google-yellow))] bg-clip-text text-transparent">
              Community Card
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Create a personalized GDG OIST community card and share your journey
            of learning, building, and growing with the community.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-6 rounded-3xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 md:p-8"
          >
            <div className="space-y-2">
              <Label htmlFor="card-name" className="text-foreground">
                Full Name
              </Label>
              <Input
                id="card-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-branch" className="text-foreground">
                  Branch
                </Label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger id="card-branch">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-year" className="text-foreground">
                  Year
                </Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger id="card-year">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-track" className="text-foreground">
                Tech Track
              </Label>
              <Select value={track} onValueChange={setTrack}>
                <SelectTrigger id="card-track">
                  <SelectValue placeholder="Select your track" />
                </SelectTrigger>
                <SelectContent>
                  {TRACKS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Profile Photo</Label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="card-photo"
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm text-foreground cursor-pointer hover:bg-accent/10 transition-colors"
                >
                  <Upload size={16} />
                  {photoUrl ? "Change Photo" : "Upload Photo"}
                </label>
                <input
                  id="card-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                {photoName && (
                  <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                    {photoName}
                  </span>
                )}
              </div>
            </div>

            <Button
              onClick={handleDownload}
              disabled={downloading || !cardRef.current}
              className="w-full rounded-full bg-gradient-to-r from-[hsl(var(--google-blue))] to-[hsl(var(--google-green))] text-white font-semibold hover:opacity-90 transition-opacity"
              size="lg"
            >
              <Download size={18} />
              {downloading ? "Generating..." : "Download Card"}
            </Button>
          </motion.div>

          {/* Right: Live card preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex justify-center"
          >
            <div className="w-full overflow-x-auto flex justify-center py-2">
              <div className="rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl p-4 md:p-6">
                {/* ── The actual card to be exported ── */}
                <div
                  ref={cardRef}
                  style={{
                    position: "relative",
                    width: 500,
                    height: 300,
                    overflow: "hidden",
                    borderRadius: 16,
                    background: "#ffffff",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
                    fontFamily: CARD_FONT,
                  }}
                >
                  {/* Subtle CSS grid pattern background */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.03,
                      backgroundImage:
                        "linear-gradient(#4285F4 1px, transparent 1px), linear-gradient(90deg, #4285F4 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Doodles & Accents Background SVG */}
                  <svg
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      pointerEvents: "none",
                    }}
                  >
                    {/* Dotted circuit connections */}
                    <path
                      d="M 230 45 C 255 45, 275 85, 300 85 M 300 85 L 330 85"
                      stroke="#ADCCF9"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      fill="none"
                    />
                    <circle cx="230" cy="45" r="2" fill="#4285F4" />
                    <circle cx="330" cy="85" r="2" fill="#4285F4" />

                    <path
                      d="M 120 110 C 135 135, 175 125, 190 155"
                      stroke="#ADCCF9"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      fill="none"
                    />
                    <circle cx="120" cy="110" r="2" fill="#4285F4" />
                    <circle cx="190" cy="155" r="2" fill="#4285F4" />

                    {/* Cloud Doodle */}
                    <path
                      d="M 205 95 C 201 95, 197 99, 197 103 C 197 107, 201 111, 209 111 C 213 111, 217 107, 217 103 C 217 99, 213 95, 205 95 Z"
                      stroke="#ADCCF9"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.5"
                    />

                    {/* Isometric Cube 1 (top right-ish) */}
                    <g transform="translate(425, 80)" stroke="#ADCCF9" strokeWidth="1" fill="none" opacity="0.6">
                      <polygon points="0,-10 15,-5 0,0 -15,-5" />
                      <polygon points="-15,-5 0,0 0,10 -15,5" />
                      <polygon points="0,0 15,-5 15,5 0,10" />
                    </g>

                    {/* Isometric Cube 2 (middle left-ish) */}
                    <g transform="translate(65, 220)" stroke="#ADCCF9" strokeWidth="1" fill="none" opacity="0.6">
                      <polygon points="0,-10 15,-5 0,0 -15,-5" />
                      <polygon points="-15,-5 0,0 0,10 -15,5" />
                      <polygon points="0,0 15,-5 15,5 0,10" />
                    </g>
                  </svg>

                  {/* Top Google-color gradient bar */}
                  <div
                    style={{
                      height: 4,
                      width: "100%",
                      background:
                        "linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)",
                    }}
                  />

                  {/* Left Column: branding, heading, tagline, campus outline */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "24px",
                      width: "230px",
                      bottom: "20px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* GDG OIST text branding with colored dots */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4285F4" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EA4335" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FBBC04" }} />
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34A853" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.1" }}>
                        <span style={{ fontSize: "14px", fontWeight: "800", color: "#202124", fontFamily: CARD_FONT, letterSpacing: "-0.2px" }}>GDG</span>
                        <span style={{ fontSize: "8px", fontWeight: "600", color: "#5f6368", letterSpacing: "0.2px", fontFamily: CARD_FONT }}>On Campus • OIST Bhopal</span>
                      </div>
                    </div>

                    {/* Main big heading */}
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "900",
                        color: "#202124",
                        lineHeight: "1.15",
                        margin: "0 0 10px 0",
                        fontFamily: CARD_FONT,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      PROUD
                      <br />
                      <span style={{ color: "#4285F4" }}>GDG OIST</span>
                      <br />
                      COMMUNITY MEMBER
                    </h3>

                    {/* Google Color Underline Bar */}
                    <div style={{ display: "flex", width: "80px", height: "3px", marginBottom: "10px", borderRadius: "1.5px", overflow: "hidden" }}>
                      <div style={{ flex: 1, background: "#4285F4" }} />
                      <div style={{ flex: 1, background: "#EA4335" }} />
                      <div style={{ flex: 1, background: "#FBBC04" }} />
                      <div style={{ flex: 1, background: "#34A853" }} />
                    </div>

                    {/* Tagline */}
                    <p
                      style={{
                        fontSize: "8.5px",
                        fontWeight: "700",
                        color: "#5F6368",
                        letterSpacing: "0.8px",
                        margin: 0,
                        fontFamily: CARD_FONT,
                        textTransform: "uppercase",
                      }}
                    >
                      Learn • Build • Grow • Inspire
                    </p>
                  </div>

                  {/* Bottom-left Campus outline drawing */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      left: "20px",
                      width: "210px",
                      height: "60px",
                      opacity: 0.85,
                      pointerEvents: "none",
                    }}
                  >
                    <svg viewBox="0 0 210 60" fill="none" stroke="#4285F4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="55" x2="205" y2="55" />
                      <path d="M12 55 C 8 47, 16 39, 20 55 Z" fill="#E8F0FE" />
                      <path d="M18 55 C 14 43, 22 35, 25 55 Z" fill="#ADCCF9" />
                      <rect x="35" y="35" width="35" height="20" fill="#E8F0FE" />
                      <line x1="42" y1="41" x2="50" y2="41" />
                      <line x1="57" y1="41" x2="63" y2="41" />
                      <line x1="42" y1="48" x2="50" y2="48" />
                      <line x1="57" y1="48" x2="63" y2="48" />
                      <rect x="70" y="23" width="70" height="32" fill="#E8F0FE" />
                      <line x1="78" y1="29" x2="88" y2="29" />
                      <line x1="93" y1="29" x2="103" y2="29" />
                      <line x1="108" y1="29" x2="118" y2="29" />
                      <line x1="123" y1="29" x2="132" y2="29" />
                      <line x1="78" y1="39" x2="88" y2="39" />
                      <line x1="93" y1="39" x2="103" y2="39" />
                      <line x1="108" y1="39" x2="118" y2="39" />
                      <line x1="123" y1="39" x2="132" y2="39" />
                      <path d="M98 55 V 47 H 112 V 55" fill="#ffffff" />
                      <rect x="140" y="12" width="35" height="43" fill="#E8F0FE" />
                      <line x1="148" y1="18" x2="167" y2="18" />
                      <line x1="148" y1="26" x2="167" y2="26" />
                      <line x1="148" y1="34" x2="167" y2="34" />
                      <line x1="148" y1="42" x2="167" y2="42" />
                      <path d="M182 55 C 176 47, 186 41, 190 55 Z" fill="#E8F0FE" />
                      <path d="M192 55 C 187 43, 197 35, 202 55 Z" fill="#ADCCF9" />
                    </svg>
                  </div>

                  {/* Dark Blue Left-Footer Bar */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "250px",
                      height: "32px",
                      background: "#0d2c54",
                      borderBottomLeftRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "24px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9.5px",
                        fontWeight: "600",
                        color: "#ffffff",
                        fontFamily: CARD_FONT,
                        letterSpacing: "0.2px",
                      }}
                    >
                      Building with GDG OIST Bhopal
                    </span>
                  </div>

                  {/* Right Column Profile photo */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "24px",
                      width: "82px",
                      height: "82px",
                      borderRadius: "50%",
                      padding: "3px",
                      background: "conic-gradient(#4285F4 0% 25%, #EA4335 25% 50%, #FBBC04 50% 75%, #34A853 75% 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#e8eaed",
                            borderRadius: "50%",
                          }}
                        >
                          <User size={28} color="#9aa0a6" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column User Details Area */}
                  <div
                    style={{
                      position: "absolute",
                      top: "112px",
                      left: "280px",
                      right: "24px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "800",
                        color: "#202124",
                        lineHeight: "1.1",
                        margin: "0 0 4px 0",
                        fontFamily: CARD_FONT,
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {displayName}
                    </p>

                    <p
                      style={{
                        fontSize: "11.5px",
                        fontWeight: "600",
                        color: "#4285F4",
                        fontStyle: "italic",
                        margin: "0 0 12px 0",
                        fontFamily: CARD_FONT,
                      }}
                    >
                      I’m Building with GDG OIST
                    </p>

                    {/* Detail Rows with Pill Icons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                          </svg>
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "600", color: "#5f6368", fontFamily: CARD_FONT }}>
                          {displayBranch}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                          </svg>
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "600", color: "#5f6368", fontFamily: CARD_FONT }}>
                          {displayTrack}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "600", color: "#5f6368", fontFamily: CARD_FONT }}>
                          Joined: {joinedDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Overlapping Google-colored circles at bottom-right corner */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-20px",
                      right: "-20px",
                      width: "95px",
                      height: "95px",
                      pointerEvents: "none",
                    }}
                  >
                    <svg viewBox="0 0 95 95" style={{ width: "100%", height: "100%" }}>
                      {/* Green circle */}
                      <circle cx="58" cy="58" r="32" fill="#34A853" opacity="0.85" />
                      {/* Yellow circle */}
                      <circle cx="36" cy="62" r="24" fill="#FBBC05" opacity="0.9" />
                      {/* Red circle */}
                      <circle cx="62" cy="36" r="20" fill="#EA4335" opacity="0.85" />
                      {/* Blue circle */}
                      <circle cx="42" cy="42" r="16" fill="#4285F4" opacity="0.8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MemberCardGenerator;
