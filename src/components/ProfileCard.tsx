import React, { useEffect, useRef, useCallback, useMemo, memo } from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
    avatarUrl?: string;
    miniAvatarUrl?: string;
    name?: string;
    title?: string;
    handle?: string;
    linkedin_url?: string;
    github_url?: string;
    twitter_url?: string;
    contactText?: string;
    className?: string;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = memo(({
    avatarUrl = "",
    miniAvatarUrl,
    name = "",
    title = "",
    handle = "",
    linkedin_url,
    github_url,
    twitter_url,
    contactText = "Contact",
    className = ""
}) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const shellRef = useRef<HTMLDivElement>(null);

    const enterTimerRef = useRef<number | null>(null);
    const leaveRafRef = useRef<number | null>(null);

    const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
    const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
    const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
        round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

    const tiltEngine = useMemo(() => {
        let rafId: number | null = null;
        let running = false;
        let lastTs = 0;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const DEFAULT_TAU = 0.14;
        const INITIAL_TAU = 0.6;
        let initialUntil = 0;

        const setVarsFromXY = (x: number, y: number) => {
            const shell = shellRef.current;
            const wrap = wrapRef.current;
            if (!shell || !wrap) return;

            const width = shell.clientWidth || 1;
            const height = shell.clientHeight || 1;
            const percentX = clamp((100 / width) * x);
            const percentY = clamp((100 / height) * y);
            const centerX = percentX - 50;
            const centerY = percentY - 50;

            const properties: Record<string, string> = {
                '--pointer-x': `${percentX}%`,
                '--pointer-y': `${percentY}%`,
                '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
                '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
                '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
                '--pointer-from-top': `${percentY / 100}`,
                '--pointer-from-left': `${percentX / 100}`,
                '--rotate-x': `${round(-(centerX / 5))}deg`,
                '--rotate-y': `${round(centerY / 4)}deg`
            };

            for (const [k, v] of Object.entries(properties)) {
                wrap.style.setProperty(k, v);
            }
        };

        const step = (ts: number) => {
            if (!running) return;
            if (lastTs === 0) lastTs = ts;
            const dt = (ts - lastTs) / 1000;
            lastTs = ts;

            const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
            const k = 1 - Math.exp(-dt / tau);

            currentX += (targetX - currentX) * k;
            currentY += (targetY - currentY) * k;

            setVarsFromXY(currentX, currentY);

            const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

            if (stillFar || document.hasFocus()) {
                rafId = requestAnimationFrame(step);
            } else {
                running = false;
                lastTs = 0;
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            }
        };

        const start = () => {
            if (running) return;
            running = true;
            lastTs = 0;
            rafId = requestAnimationFrame(step);
        };

        return {
            setImmediate(x: number, y: number) {
                currentX = x;
                currentY = y;
                setVarsFromXY(currentX, currentY);
            },
            setTarget(x: number, y: number) {
                targetX = x;
                targetY = y;
                start();
            },
            toCenter() {
                const shell = shellRef.current;
                if (!shell) return;
                this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
            },
            beginInitial(durationMs: number) {
                initialUntil = performance.now() + durationMs;
                start();
            },
            getCurrent() {
                return { x: currentX, y: currentY, tx: targetX, ty: targetY };
            },
            cancel() {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
                running = false;
                lastTs = 0;
            }
        };
    }, []);

    const getOffsets = (evt: React.PointerEvent | PointerEvent, el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    };

    const handlePointerMove = useCallback(
        (event: PointerEvent) => {
            const shell = shellRef.current;
            if (!shell) return;
            const { x, y } = getOffsets(event, shell);
            tiltEngine.setTarget(x, y);
        },
        [tiltEngine]
    );

    const handlePointerEnter = useCallback(
        (event: PointerEvent) => {
            const shell = shellRef.current;
            if (!shell) return;

            shell.classList.add('active');
            shell.classList.add('entering');

            if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
            enterTimerRef.current = window.setTimeout(() => {
                shell.classList.remove('entering');
            }, 180);

            const { x, y } = getOffsets(event, shell);
            tiltEngine.setTarget(x, y);
        },
        [tiltEngine]
    );

    const handlePointerLeave = useCallback(() => {
        const shell = shellRef.current;
        if (!shell) return;

        tiltEngine.toCenter();

        const checkSettle = () => {
            const { x, y, tx, ty } = tiltEngine.getCurrent();
            const settled = Math.hypot(tx - x, ty - y) < 0.6;
            if (settled) {
                shell.classList.remove('active');
                leaveRafRef.current = null;
            } else {
                leaveRafRef.current = requestAnimationFrame(checkSettle);
            }
        };
        if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
        leaveRafRef.current = requestAnimationFrame(checkSettle);
    }, [tiltEngine]);

    useEffect(() => {
        const shell = shellRef.current;
        if (!shell) return;

        const pointerMoveHandler = handlePointerMove;
        const pointerEnterHandler = handlePointerEnter;
        const pointerLeaveHandler = handlePointerLeave;

        shell.addEventListener('pointerenter', pointerEnterHandler);
        shell.addEventListener('pointermove', pointerMoveHandler);
        shell.addEventListener('pointerleave', pointerLeaveHandler);

        const initialX = (shell.clientWidth || 0) - 70;
        const initialY = 60;
        tiltEngine.setImmediate(initialX, initialY);
        tiltEngine.toCenter();
        tiltEngine.beginInitial(1200);

        return () => {
            shell.removeEventListener('pointerenter', pointerEnterHandler);
            shell.removeEventListener('pointermove', pointerMoveHandler);
            shell.removeEventListener('pointerleave', pointerLeaveHandler);
            if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
            if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
            tiltEngine.cancel();
            shell.classList.remove('entering');
        };
    }, [tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

    const socialLink = useMemo(() => {
        const link = linkedin_url?.trim() || github_url?.trim() || twitter_url?.trim() || null;
        return link;
    }, [linkedin_url, github_url, twitter_url]);

    const isContactAvailable = !!socialLink;

    const handleContactClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (socialLink) {
            window.location.href = socialLink;
        }
    }, [socialLink]);

    return (
        <div ref={wrapRef} className={`modern-profile-card ${className}`.trim()}>
            <div 
                ref={shellRef} 
                className="card-shell"
                style={{ '--avatar-bg': `url(${avatarUrl})` } as React.CSSProperties}
            >
                <div className="card-content">
                    {/* Info Section */}
                    <div className="info-section">
                        <h3 className="name">{name}</h3>
                        <p className="title">{title}</p>
                        <p className="handle">@{handle}</p>
                        
                        {/* Contact Button */}
                        <button
                            className={`contact-button ${!isContactAvailable ? "disabled" : ""}`}
                            onClick={handleContactClick}
                            type="button"
                            aria-label={`Contact ${name || 'user'}`}
                            disabled={!isContactAvailable}
                        >
                            {isContactAvailable ? contactText : "No Contact"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProfileCardComponent.displayName = "ProfileCard";

export default ProfileCardComponent;