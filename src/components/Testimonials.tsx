import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar_initials: string;
  quote: string;
  rating: number;
  color_index: number;
}

const colorOptions = [
  "from-[hsl(var(--google-blue))] to-[hsl(217,89%,50%)]",
  "from-[hsl(var(--google-red))] to-[hsl(7,81%,45%)]",
  "from-[hsl(var(--google-green))] to-[hsl(142,53%,33%)]",
  "from-[hsl(var(--google-yellow))] to-[hsl(43,96%,40%)]",
  "from-[hsl(var(--google-blue))] to-[hsl(var(--google-green))]",
];

const TestimonialCard = ({
  testimonial,
  direction,
}: {
  testimonial: Testimonial;
  direction: number;
}) => {
  const color = colorOptions[testimonial.color_index % colorOptions.length];

  return (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, x: direction > 0 ? 200 : -200, scale: 0.9, rotateY: direction > 0 ? 15 : -15 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -200 : 200, scale: 0.9, rotateY: direction > 0 ? -15 : 15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
      style={{ perspective: "1200px" }}
    >
      <div className="relative h-full rounded-3xl border border-border/40 bg-card/60 backdrop-blur-xl p-8 md:p-12 overflow-hidden group">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} />
        <Quote className="absolute top-6 right-8 text-foreground/[0.04]" size={120} strokeWidth={1} />

        <div className="flex gap-1 mb-6">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 400 }}
            >
              <Star size={16} className="fill-[hsl(var(--google-yellow))] text-[hsl(var(--google-yellow))]" />
            </motion.div>
          ))}
        </div>

        <blockquote className="text-lg md:text-xl lg:text-2xl text-foreground/80 font-body leading-relaxed mb-8 relative z-10">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex items-center gap-4 relative z-10">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
            {testimonial.avatar_initials}
          </div>
          <div>
            <p className="font-display font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>

        <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${color} opacity-[0.06] blur-3xl group-hover:opacity-[0.1] transition-opacity duration-700`} />
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("id, name, role, avatar_initials, quote, rating, color_index")
          .eq("is_visible", true)
          .order("display_order", { ascending: true });
        if (!error && data) setTestimonials(data);
      } catch {
        // Silently fail — section will not render if empty
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || !isInView || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView, testimonials.length]);

  const navigate = (dir: number) => {
    setIsAutoPlaying(false);
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ position: "relative" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Community Voices
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--google-blue))] via-[hsl(var(--google-red))] to-[hsl(var(--google-yellow))] bg-clip-text text-transparent">
              Members
            </span>{" "}
            Say
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real stories from developers who grew with GDG OIST
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-[340px] md:h-[300px]">
            <AnimatePresence mode="popLayout" custom={direction}>
              <TestimonialCard
                key={current}
                testimonial={testimonials[current]}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="relative p-1"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary scale-125" : "bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
