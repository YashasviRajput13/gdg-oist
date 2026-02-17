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

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's connect
          </h2>
          <p className="text-muted-foreground">
            Have a question or want to collaborate? Drop us a message.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {submitted ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <CheckCircle className="mx-auto mb-4 text-accent" size={48} />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Message sent!
              </h3>
              <p className="text-muted-foreground">
                We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-6 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full px-6 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                />
              </div>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Your message"
                className="w-full px-6 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
