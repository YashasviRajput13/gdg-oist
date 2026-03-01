import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

const avatarGradients = [
  "from-[hsl(217,89%,61%)] to-[hsl(217,89%,45%)]",
  "from-[hsl(7,81%,56%)] to-[hsl(7,81%,42%)]",
  "from-[hsl(43,96%,50%)] to-[hsl(43,96%,38%)]",
  "from-[hsl(142,53%,43%)] to-[hsl(142,53%,30%)]",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group text-center p-8 rounded-3xl hover:bg-background hover:shadow-xl transition-all duration-500 border border-transparent hover:border-border"
            >
              <motion.div
                whileHover={{ rotateY: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center mb-6 shadow-lg`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className="text-3xl font-bold text-primary-foreground">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                )}
              </motion.div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
              {member.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs mx-auto">
                  {member.bio}
                </p>
              )}

              <div className="flex items-center justify-center gap-3">
                {member.github_url && (
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={member.github_url} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                    <Github size={18} />
                  </motion.a>
                )}
                {member.linkedin_url && (
                  <motion.a whileHover={{ scale: 1.2, rotate: -5 }} href={member.linkedin_url} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                    <Linkedin size={18} />
                  </motion.a>
                )}
                {member.twitter_url && (
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={member.twitter_url} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                    <Twitter size={18} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
