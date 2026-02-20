import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const SectionTransition = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 60 : 0,
    x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
    filter: "blur(4px)",
  };

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;
