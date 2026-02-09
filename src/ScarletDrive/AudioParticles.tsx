import React, { useRef, useEffect } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const AudioParticles: React.FC<{ beat: number; velocityX?: number; velocityY?: number }> = ({
    beat,
    velocityX = 0,
    velocityY = 0
}) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<any[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // ORGANIC SPARK EMISSION
        const emissionRate = Math.floor(10 + beat * 45);
        for (let i = 0; i < emissionRate; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 50 + 10;
            particles.current.push({
                x: width / 2,
                y: height / 2,
                history: [], // For curved trails
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.01 + Math.random() * 0.02,
                color: Math.random() > 0.4 ? '#ff2a6d' : '#ffffff',
                size: Math.random() * 3 + 1,
                wiggles: Math.random() * 0.2 // Swirly factor
            });
        }

        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'screen';

        for (let i = particles.current.length - 1; i >= 0; i--) {
            const p = particles.current[i];

            // Push current position to history
            p.history.push({ x: p.x, y: p.y });
            if (p.history.length > 12) p.history.shift();

            // SWIRLY PHYSICS: Add sine-wave based oscillation
            const swirlX = Math.sin(frame * 0.5 + i) * p.wiggles * 30;
            const swirlY = Math.cos(frame * 0.5 + i) * p.wiggles * 30;

            p.vx += velocityX * 12.0 + swirlX;
            p.vy += velocityY * 12.0 + swirlY;

            p.x += p.vx;
            p.y += p.vy;

            p.life -= p.decay;

            if (p.life <= 0) {
                particles.current.splice(i, 1);
                continue;
            }

            // ORGANIC CURVED TRAIL RENDERING
            if (p.history.length > 1) {
                ctx.beginPath();
                ctx.moveTo(p.history[0].x, p.history[0].y);

                for (let j = 1; j < p.history.length; j++) {
                    const point = p.history[j];
                    ctx.lineTo(point.x, point.y);
                }

                const alpha = p.life;
                ctx.strokeStyle = p.color;
                ctx.lineWidth = p.size * p.life;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.globalAlpha = alpha * 0.8;
                ctx.stroke();
            }

            // Glow core
            if (p.life > 0.7) {
                ctx.fillStyle = '#fff';
                ctx.globalAlpha = p.life;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        if (particles.current.length > 1200) {
            particles.current.splice(0, particles.current.length - 1200);
        }
    }, [frame, beat, velocityX, velocityY, width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                filter: 'blur(0.8px) brightness(1.3) contrast(1.1)',
            }}
        />
    );
};
