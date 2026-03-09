import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'framer-motion';
import './FlowingMenu.css';

interface FlowingMenuItemProps {
    link?: string;
    text: string;
    image?: string;
    marqueeBgImage?: string;
    speed?: number;
    textColor?: string;
    marqueeBgColor?: string;
    marqueeTextColor?: string;
    borderColor?: string;
}

interface FlowingMenuProps {
    items?: FlowingMenuItemProps[];
    speed?: number;
    textColor?: string;
    bgColor?: string;
    marqueeBgColor?: string;
    marqueeTextColor?: string;
    borderColor?: string;
}

function FlowingMenu({
    items = [],
    speed = 15,
    textColor = '#fff',
    bgColor = 'transparent',
    marqueeBgColor = '#fff',
    marqueeTextColor = '#060010',
    borderColor = 'rgba(255,255,255,0.15)',
}: FlowingMenuProps) {
    return (
        <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
            <nav className="menu">
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        speed={speed}
                        textColor={textColor}
                        marqueeBgColor={marqueeBgColor}
                        marqueeTextColor={marqueeTextColor}
                        borderColor={borderColor}
                    />
                ))}
            </nav>
        </div>
    );
}



function MenuItem({
    link,
    text,
    image,
    speed = 15,
    textColor = '#fff',
    marqueeBgColor = '#fff',
    marqueeTextColor = '#060010',
    borderColor = 'rgba(255,255,255,0.15)',
}: FlowingMenuItemProps) {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const [repetitions, setRepetitions] = useState(4);
    const itemInView = useInView(itemRef, { margin: "50px" });

    useEffect(() => {
        if (animationRef.current) {
            if (itemInView) {
                animationRef.current.play();
            } else {
                animationRef.current.pause();
            }
        }
    }, [itemInView]);

    const animationDefaults = { duration: 0.6, ease: 'expo' };

    const distMetric = (x: number, y: number, x2: number, y2: number) => {
        const xDiff = x - x2;
        const yDiff = y - y2;
        return xDiff * xDiff + yDiff * yDiff;
    };

    const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
        const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
        const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    useEffect(() => {
        const calculateRepetitions = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement | null;
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            const viewportWidth = window.innerWidth;
            const needed = Math.ceil(viewportWidth / contentWidth) + 2;
            setRepetitions(Math.max(4, needed));
        };

        calculateRepetitions();
        window.addEventListener('resize', calculateRepetitions);
        return () => window.removeEventListener('resize', calculateRepetitions);
    }, [text, image]);

    useEffect(() => {
        const setupMarquee = () => {
            if (!marqueeInnerRef.current) return;
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement | null;
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            if (contentWidth === 0) return;

            if (animationRef.current) animationRef.current.kill();

            animationRef.current = gsap.to(marqueeInnerRef.current, {
                x: -contentWidth,
                duration: speed,
                ease: 'none',
                repeat: -1,
            });
            if (!itemInView) {
                animationRef.current.pause();
            }
        };

        const timer = setTimeout(setupMarquee, 50);
        return () => {
            clearTimeout(timer);
            if (animationRef.current) animationRef.current.kill();
        };
    }, [text, image, repetitions, speed, itemInView]);

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {

        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const edge = findClosestEdge(x, y, rect.width, rect.height);

        gsap
            .timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const edge = findClosestEdge(x, y, rect.width, rect.height);

        gsap
            .timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    };

    return (
        <div className="menu__item" ref={itemRef} style={{ borderColor }}>
            <a
                className="menu__item-link"
                href={link ?? '#'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => { }}
                style={{ color: textColor }}
            >
                {text}
            </a>
            <div className="marquee" ref={marqueeRef} style={{
                backgroundColor: marqueeBgColor,
            }}>
                {image && (
                    <img 
                        src={image} 
                        crossOrigin="anonymous" 
                        alt="" 
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.5,
                            zIndex: 0,
                        }}
                    />
                )}
                <div className="marquee__inner-wrap" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
                        {[...Array(repetitions)].map((_, idx) => (
                            <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                                <span>{text}</span>
                                {image && <img className="marquee__img" src={image} crossOrigin="anonymous" alt="" style={{ objectFit: 'cover' }} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlowingMenu;
