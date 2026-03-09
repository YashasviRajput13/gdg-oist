import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlobConfig {
  color: string;
  size: string;
  position: string;
  delay?: number;
  duration?: number;
}

interface FloatingBlobsProps {
  blobs?: BlobConfig[];
  className?: string;
}

const defaultBlobs: BlobConfig[] = [
  { color: "bg-google-blue/8", size: "w-72 h-72", position: "top-10 -left-20", delay: 0, duration: 18 },
  { color: "bg-google-red/6", size: "w-56 h-56", position: "top-1/3 -right-10", delay: 2, duration: 22 },
  { color: "bg-google-green/7", size: "w-64 h-64", position: "bottom-20 left-1/4", delay: 4, duration: 20 },
  { color: "bg-google-yellow/6", size: "w-48 h-48", position: "bottom-1/3 right-1/4", delay: 1, duration: 24 },
];

const FloatingBlobs = ({ blobs = defaultBlobs, className = "" }: FloatingBlobsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "200px" });

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {isInView && blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -25, 10, -15, 0],
            x: [0, 15, -10, 20, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: blob.duration || 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay || 0,
          }}
          className={`absolute ${blob.position} ${blob.size} ${blob.color} animate-blob blur-3xl`}
        />
      ))}
    </div>
  );
};

export default FloatingBlobs;
