import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What is GDG OIST Bhopal?",
    answer: "GDG OIST Bhopal is an independent community group of developers, students, and tech enthusiasts who are passionate about Google technologies. We organize workshops, hackathons, tech talks, and study jams to help members grow their skills and connect with like-minded people.",
  },
  {
    question: "Do I need to be a Computer Science student to join?",
    answer: "Not at all! GDG is open to everyone — regardless of your branch, year, or skill level. If you're curious about technology, you're welcome here. We've had members from mechanical, electrical, and even MBA backgrounds!",
  },
  {
    question: "How can I become a member?",
    answer: "Simply attend our events and join our community channels. There's no formal registration needed — just show up, learn, and connect with fellow developers! You can also fill out our contact form to stay updated on upcoming events.",
  },
  {
    question: "Are GDG events free?",
    answer: "Yes, almost all of our events are completely free. We believe knowledge should be accessible to everyone. Some special events like hackathons may have limited seats, and a nominal registration fee may apply to cover logistics.",
  },
  {
    question: "Can I speak at or organize an event?",
    answer: "Absolutely! We encourage community members to share their knowledge. Reach out to us through the contact form or speak with any team member to propose a talk or workshop. We actively look for passionate speakers.",
  },
  {
    question: "How does GDG connect with Google?",
    answer: "GDG chapters are officially recognized by Google but are independently organized and run by volunteers. We get access to Google resources, speakers, and materials to host better events for our community.",
  },
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const headingWords = ["Frequently", "asked", "questions"];

  return (
    <section id="faq" className="section-padding bg-card relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative">
        <motion.div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4"
          >
            <MessageCircle size={14} />
            <span className="text-xs font-semibold tracking-wider uppercase">FAQ</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border text-left transition-all duration-300 group ${
                  openIndex === i
                    ? "bg-primary/5 border-primary/20 shadow-md"
                    : "bg-background border-border hover:shadow-md hover:border-primary/10"
                }`}
              >
                <span className={`font-display font-semibold pr-4 transition-colors ${
                  openIndex === i ? "text-primary" : "text-foreground"
                }`}>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className={`transition-colors ${openIndex === i ? "text-primary" : "text-muted-foreground"}`} />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 pt-3 text-sm text-muted-foreground leading-relaxed border-x border-b border-primary/20 rounded-b-2xl bg-primary/5">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center p-8 rounded-2xl border border-dashed border-border"
        >
          <p className="text-muted-foreground mb-4 font-body">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all"
          >
            <MessageCircle size={16} />
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
