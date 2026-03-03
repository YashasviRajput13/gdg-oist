import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ChromaGrid, { type ChromaGridItem } from "@/components/ChromaGrid";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
}

const googleColors = [
  { border: 'hsl(217 89% 61%)', gradient: 'linear-gradient(145deg, hsl(217 89% 61%), hsl(224 25% 7%))' },
  { border: 'hsl(7 81% 56%)', gradient: 'linear-gradient(210deg, hsl(7 81% 56%), hsl(224 25% 7%))' },
  { border: 'hsl(43 96% 50%)', gradient: 'linear-gradient(165deg, hsl(43 96% 50%), hsl(224 25% 7%))' },
  { border: 'hsl(142 53% 43%)', gradient: 'linear-gradient(195deg, hsl(142 53% 43%), hsl(224 25% 7%))' },
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

  const chromaItems: ChromaGridItem[] = members.map((m, i) => ({
    image: m.avatar_url,
    title: m.name,
    subtitle: m.role,
    handle: m.bio ? m.bio.substring(0, 60) : null,
    borderColor: googleColors[i % googleColors.length].border,
    gradient: googleColors[i % googleColors.length].gradient,
    url: m.linkedin_url || m.github_url || m.twitter_url || null,
  }));

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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChromaGrid
            items={chromaItems}
            columns={3}
            className="max-sm:[&]:!grid-cols-1 max-lg:[&]:!grid-cols-2"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
