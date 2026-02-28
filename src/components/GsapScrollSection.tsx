import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// register the plugin once per application
gsap.registerPlugin(ScrollTrigger);

const GsapScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".container",
          pin: true,
          start: "top top",
          end: "+=500",
          scrub: 1,
          snap: {
            snapTo: "labels",
            duration: { min: 0.2, max: 3 },
            delay: 0.2,
            ease: "power1.inOut",
          },
        },
      });

      tl.addLabel("start")
        .from(".box p", { scale: 0.3, rotation: 45, autoAlpha: 0 })
        .addLabel("color")
        .from(".box", { backgroundColor: "#28a92b" })
        .addLabel("spin")
        .to(".box", { rotation: 360 })
        .addLabel("end");
    }, containerRef); // scope selectors to this component

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="container">
      <div className="box p-10 bg-blue-500 text-white">
        <p>Animate me as you scroll!</p>
      </div>
    </div>
  );
};

export default GsapScrollSection;
