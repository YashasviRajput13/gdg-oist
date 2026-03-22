import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toDirectImageUrl } from "@/lib/driveUrl";
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

const categoryOrder = [
  "Leads",
  "Content & Communication",
  "WIT",
  "Technical",
  "Event Management",
  "Media",
  "Marketing",
];

const Team = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

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

  const filteredMembers = useMemo(() => {
    return activeCategory === "All"
      ? members
      : members.filter(
          (m) => (m.category || "Other") === activeCategory
        );
  }, [members, activeCategory]);

  return (
    <section
      id="team"
      className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden"
      ref={sectionRef}
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        {/* HEADING SECTION */}
        <div className="text-center mb-10">
          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium uppercase tracking-wider mb-3">
            MEET OUR HUB
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            The people behind GDG
          </h2>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500">
          {["All", ...categoryOrder].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap border ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400/50 shadow-lg shadow-blue-500/25 scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:scale-105"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 place-items-center md:place-items-stretch">
          {filteredMembers.map((m, i) => {
            const handleMemberClick = () => {
              const url = m.linkedin_url || m.github_url || m.twitter_url;
              if (url) window.open(url, '_blank', 'noopener,noreferrer');
            };
            return (
              <ProfileCard
                key={m.id}
                avatarUrl={toDirectImageUrl(m.avatar_url || "/placeholder.svg")}
                name={m.name}
                title={m.role}
                handle={m.name.toLowerCase().replace(/\s+/g, "")}
                linkedin_url={m.linkedin_url || undefined}
                github_url={m.github_url || undefined}
                twitter_url={m.twitter_url || undefined}
                contactText="Contact"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;