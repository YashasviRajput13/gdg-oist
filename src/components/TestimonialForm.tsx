import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Star, Send } from "lucide-react";
import { motion } from "framer-motion";

export const TestimonialForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    role: "",
    quote: "",
    rating: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.quote) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    
    // Auto-generate initials
    const avatar_initials = form.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    try {
      const { error } = await supabase.from("testimonials").insert({
        name: form.name.trim(),
        role: form.role.trim(),
        quote: form.quote.trim(),
        rating: form.rating,
        avatar_initials,
        color_index: Math.floor(Math.random() * 5),
        display_order: 999, // Put at the end
        is_visible: false, // Pending approval!
      });

      if (error) throw error;

      toast({
        title: "Review submitted successfully!",
        description: "Your testimonial has been sent to our admins for approval.",
      });

      setOpen(false);
      setForm({ name: "", role: "", quote: "", rating: 5 });
    } catch (err: unknown) {
  toast({
    title: "Submission failed",
    description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full shadow-sm hover:shadow-md transition-all gap-2" size="lg">
          <Star className="w-4 h-4 fill-primary text-primary" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Share Your Experience</DialogTitle>
          <DialogDescription>
            Tell us about your journey with GDG OIST. It will be displayed after a quick review.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase text-muted-foreground mr-2 tracking-wide">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= form.rating ? "fill-[hsl(var(--google-yellow))] text-[hsl(var(--google-yellow))]" : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-background"
              maxLength={50}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Your Role (e.g., Core Team, Student, Member)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="bg-background"
              maxLength={50}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="How has GDG OIST impacted you?"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="resize-none h-24 bg-background"
              maxLength={300}
              required
            />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full gap-2 mt-2"
            >
              {loading ? "Submitting..." : "Submit for Review"}
              {!loading && <Send className="w-4 h-4" />}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
