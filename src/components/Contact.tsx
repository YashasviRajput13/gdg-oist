import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { error } = await supabase.from("contact_submissions").insert({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
    }
  };

  const headingWords = ["Let's", "connect"];

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
          >
            Get in Touch
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Have a question or want to collaborate? Drop us a message and we'll get back to you.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -10 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center py-20 bg-card rounded-3xl border border-border"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-6"
              >
                <CheckCircle className="text-accent" size={40} />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Message sent!</h3>
              <p className="text-muted-foreground">We'll get back to you soon.</p>
            </motion.div>
          ) : (
            <div className="bg-card rounded-3xl border border-border p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: "name", label: "Name", placeholder: "John Doe", type: "text" },
                    { name: "email", label: "Email", placeholder: "john@example.com", type: "email" },
                  ].map((field, i) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                    >
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-body transition-all"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-body resize-none transition-all"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -10px hsl(217 89% 61% / 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full md:w-auto px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send size={16} />
                </motion.button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
