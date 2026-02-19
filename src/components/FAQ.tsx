import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is GDG OIST Bhopal?",
    answer: "GDG OIST Bhopal is an independent community group of developers, students, and tech enthusiasts who are passionate about Google technologies. We organize workshops, hackathons, tech talks, and study jams.",
  },
  {
    question: "Do I need to be a Computer Science student to join?",
    answer: "Not at all! GDG is open to everyone — regardless of your branch, year, or skill level. If you're curious about technology, you're welcome here.",
  },
  {
    question: "How can I become a member?",
    answer: "Simply attend our events and join our community channels. There's no formal registration needed — just show up, learn, and connect with fellow developers!",
  },
  {
    question: "Are GDG events free?",
    answer: "Yes, almost all of our events are completely free. We believe knowledge should be accessible to everyone. Some special events like hackathons may have limited seats.",
  },
  {
    question: "Can I speak at or organize an event?",
    answer: "Absolutely! We encourage community members to share their knowledge. Reach out to us through the contact form or speak with any team member to propose a talk or workshop.",
  },
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const headingWords = ["Frequently", "asked", "questions"];

  return (
    <section id="faq" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
          >
            FAQ
          </motion.p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 rounded-2xl bg-card border border-border text-left hover:shadow-md transition-all duration-300 group"
              >
                <span className="font-display font-semibold text-foreground pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="text-muted-foreground" />
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
                <p className="px-6 pb-6 pt-2 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
