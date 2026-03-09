import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export interface ChromaGridItem {
  image?: string | null;
  title: string;
  subtitle: string;
  handle?: string | null;
  borderColor?: string;
  gradient?: string;
  url?: string | null;
  location?: string | null;
}

interface ChromaGridProps {
  items: ChromaGridItem[];
  className?: string;
  radius?: number;
  columns?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}: ChromaGridProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<ReturnType<typeof gsap.quickSetter> | null>(null);
  const setY = useRef<ReturnType<typeof gsap.quickSetter> | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.MouseEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const gridStyle = {
    '--radius': `${radius}px`,
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={gridStyle}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {items.map((c, i) => (
        <div
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'hsl(var(--primary))',
            '--card-gradient': c.gradient || 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.5))',
            cursor: c.url ? 'pointer' : 'default'
          } as React.CSSProperties}
        >
          <div className="chroma-card-avatar-wrap">
            {c.image ? (
              <img src={c.image} alt={c.title} className="chroma-card-avatar" crossOrigin="anonymous" />
            ) : (
              <div className="chroma-card-initials">
                {c.title.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>

          <div className="chroma-card-info">
            <h3>{c.title}</h3>
            {c.handle && <span className="chroma-handle">{c.handle}</span>}
            <p>{c.subtitle}</p>
            {c.location && <span className="chroma-location">{c.location}</span>}
          </div>
        </div>
      ))}
      <div ref={fadeRef} className="chroma-grid-fade" />
    </div>
  );
};

export default ChromaGrid;
