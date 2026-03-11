import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";

type Variant = "wave" | "curve" | "blob" | "torn";

interface OrganicDividerProps {
  variant?: Variant;
  flip?: boolean;
  className?: string;
  color?: string; // CSS variable name like "--background" or "--card"
}

const OrganicDivider = memo(({
  variant = "wave",
  flip = false,
  className = "",
  color,
}: OrganicDividerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const fill = color ? `hsl(var(${color}))` : "hsl(var(--background))";

  const paths: Record<Variant, string> = {
    wave: "M0,64 C320,120 640,0 960,80 C1280,160 1440,40 1440,40 L1440,0 L0,0 Z",
    curve: "M0,0 L0,48 Q360,96 720,48 Q1080,0 1440,48 L1440,0 Z",
    blob: "M0,0 L0,64 C180,100 360,20 540,60 C720,100 900,30 1080,70 C1260,110 1380,50 1440,64 L1440,0 Z",
    torn: "M0,0 L0,50 L60,30 L120,55 L180,25 L240,60 L300,35 L360,50 L420,20 L480,55 L540,30 L600,60 L660,25 L720,50 L780,35 L840,55 L900,20 L960,50 L1020,30 L1080,55 L1140,25 L1200,60 L1260,35 L1320,50 L1380,25 L1440,45 L1440,0 Z",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{
        marginTop: flip ? 0 : -1,
        marginBottom: flip ? -1 : 0,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] lg:h-[100px] block"
      >
        <motion.path
          d={paths[variant]}
          fill={fill}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
});

OrganicDivider.displayName = 'OrganicDivider';

export default OrganicDivider;
