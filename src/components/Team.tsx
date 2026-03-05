import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProfileCard from "./ProfileCard";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  category: string | null;
}

const categoryOrder = ["Tech", "Media", "Women in Tech", "Other"];

const googleColors = [
  { border: 'hsl(217 89% 61%)', glow: 'rgba(66, 133, 244, 0.4)', gradient: 'linear-gradient(145deg, rgba(66, 133, 244, 0.2), rgba(6, 0, 16, 0.8))' },
  { border: 'hsl(7 81% 56%)', glow: 'rgba(234, 67, 53, 0.4)', gradient: 'linear-gradient(145deg, rgba(234, 67, 53, 0.2), rgba(6, 0, 16, 0.8))' },
  { border: 'hsl(43 96% 50%)', glow: 'rgba(251, 188, 5, 0.4)', gradient: 'linear-gradient(145deg, rgba(251, 188, 5, 0.2), rgba(6, 0, 16, 0.8))' },
  { border: 'hsl(142 53% 43%)', glow: 'rgba(52, 168, 83, 0.4)', gradient: 'linear-gradient(145deg, rgba(52, 168, 83, 0.2), rgba(6, 0, 16, 0.8))' },
];

const Team = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [members, setMembers] = useState<TeamMember[]>([]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) setMembers(data);
    };
    fetchTeam();
  }, []);

  const headingWords = ["The", "people", "behind", "GDG"];

  return (
    <section id="team" className="section-padding bg-card relative overflow-hidden" ref={sectionRef}>
      <motion.div style={{ y: bgY }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 animate-blob blur-3xl" />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <motion.div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
          >
            Our Team
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {(() => {
          const grouped = members.reduce<Record<string, TeamMember[]>>((acc, m) => {
            const cat = m.category || "Other";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(m);
            return acc;
          }, {});
          const sortedCategories = Object.keys(grouped).sort(
            (a, b) => (categoryOrder.indexOf(a) === -1 ? 99 : categoryOrder.indexOf(a)) - (categoryOrder.indexOf(b) === -1 ? 99 : categoryOrder.indexOf(b))
          );
          let globalIndex = 0;
          return sortedCategories.map((cat, catIdx) => (
            <div key={cat} className={catIdx > 0 ? "mt-16" : ""}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + catIdx * 0.1 }}
                className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-8 border-l-4 pl-4"
                style={{ borderColor: googleColors[catIdx % googleColors.length].border }}
              >
                {cat}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + catIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
              >
                {grouped[cat].map((m) => {
                  const color = googleColors[globalIndex % googleColors.length];
                  globalIndex++;
                  return (
                    <ProfileCard
                      key={m.id}
                      avatarUrl={m.avatar_url || '/placeholder.svg'}
                      name={m.name}
                      title={m.role}
                      handle={m.name.toLowerCase().replace(/\s+/g, '')}
                      innerGradient={color.gradient}
                      behindGlowColor={color.glow}
                      onContactClick={() => {
                        const url = m.linkedin_url || m.github_url || m.twitter_url;
                        if (url) window.open(url, '_blank');
                      }}
                    />
                  );
                })}
              </motion.div>
            </div>
          ));
        })()}
      </div>
    </section>
  );
};

export default Team;
