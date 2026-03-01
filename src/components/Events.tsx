import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  event_type: string | null;
  registration_link: string | null;
  is_featured: boolean | null;
  image_url: string | null;
}

const eventTypeColors: Record<string, string> = {
  workshop: "bg-google-blue/10 text-google-blue",
  hackathon: "bg-google-red/10 text-google-red",
  talk: "bg-google-yellow/10 text-google-yellow",
  meetup: "bg-google-green/10 text-google-green",
};

import { useRef } from "react";

const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true })
        .limit(4);

      if (!error && data) {
        setEvents(data as Event[]);
      }
    };

    fetchEvents();
  }, []);

  const headingWords = ["What's", "happening", "next"];

  return (
    <section id="events" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute top-20 -right-20 w-80 h-80 bg-primary/5 animate-blob blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4"
          >
            <Sparkles size={14} />
            <span className="text-xs font-semibold tracking-wider uppercase">Upcoming Events</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className={`inline-block mr-[0.3em] ${i === 2 ? "text-gradient-google" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {events.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center py-20 bg-card rounded-3xl border border-border"
          >
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-muted-foreground font-medium">
              No upcoming events yet — stay tuned!
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group bg-card rounded-3xl border border-border p-8 hover:shadow-xl hover:border-primary/15 transition-all duration-500 relative overflow-hidden"
            >
              {event.is_featured && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-google-yellow/15 text-google-yellow font-semibold">
                    ⭐ Featured
                  </span>
                </div>
              )}

              {event.event_type && (
                <span className={`inline-flex text-xs px-3 py-1 rounded-full font-medium mb-4 ${eventTypeColors[event.event_type] || "bg-muted text-muted-foreground"}`}>
                  {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                </span>
              )}

              <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {event.title}
              </h3>

              {event.description && (
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                  {event.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  {format(new Date(event.event_date), "MMM d, yyyy")}
                </span>
                {event.location && (
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-destructive" />
                    {event.location}
                  </span>
                )}
              </div>

              {event.registration_link && (
                <motion.a
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Register Now <ArrowRight size={14} />
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
