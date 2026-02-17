import { motion, useInView } from "framer-motion";
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

const avatarColors = [
  "bg-google-blue",
  "bg-google-red",
  "bg-google-yellow",
  "bg-google-green",
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [members, setMembers] = useState<TeamMember[]>([]);

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

  return (
    <section id="team" className="section-padding bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Our Team
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            The people behind GDG
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
              className="group text-center"
            >
              {/* Avatar */}
              <div
                className={`w-24 h-24 mx-auto rounded-full ${
                  avatarColors[i % avatarColors.length]
                } flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
              >
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary-foreground">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">
                {member.role}
              </p>
              {member.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs mx-auto">
                  {member.bio}
                </p>
              )}

              {/* Socials */}
              <div className="flex items-center justify-center gap-3">
                {member.github_url && (
                  <a href={member.github_url} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github size={18} />
                  </a>
                )}
                {member.linkedin_url && (
                  <a href={member.linkedin_url} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin size={18} />
                  </a>
                )}
                {member.twitter_url && (
                  <a href={member.twitter_url} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter size={18} />
                  </a>
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
