import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Phase = "bounce" | "form" | "exit";

const dots = [
  { color: "#4285F4" },
  { color: "#EA4335" },
  { color: "#FBBC05" },
  { color: "#34A853" },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<Phase>("bounce");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("form"), 1000);
    const t2 = setTimeout(() => setPhase("exit"), 1800);
    const t3 = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const showText = phase === "form" || phase === "exit";
  const showBar = phase === "form" || phase === "exit";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #4285F4 0%, #34A853 40%, #EA4335 70%, transparent 100%)",
              }}
            />
          </div>

          {/* Bouncing dots */}
          <div className="flex items-center justify-center gap-5 mb-10">
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, scale: 1 }}
                animate={
                  phase === "bounce"
                    ? {
                        opacity: 1,
                        y: [0, -40, 0, -20, 0],
                        scale: [1, 1.25, 1, 1.1, 1],
                      }
                    : {
                        opacity: 1,
                        y: 0,
                        scale: [1, 1.5, 1],
                        rotate: [0, 360, 0],
                      }
                }
                transition={
                  phase === "bounce"
                    ? {
                        opacity: { duration: 0.3, delay: i * 0.12 },
                        y: { duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
                        scale: { duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
                      }
                    : { duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
                }
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: dot.color,
                  boxShadow: `0 16px 40px -8px ${dot.color}66`,
                }}
              >
                {/* Inner gloss */}
                <div className="absolute top-2.5 left-3 w-3 h-3 rounded-full bg-white/35 blur-[2px]" />
              </motion.div>
            ))}
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={
              showText
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 20, filter: "blur(8px)" }
            }
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              GDG{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)",
                }}
              >
                OIST Bhopal
              </span>
            </h1>
            <p className="text-sm text-muted-foreground tracking-widest uppercase font-medium">
              Google Developer Group
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showBar ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-border rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: showBar ? "0%" : "-100%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
