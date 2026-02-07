import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from './Background';

const textStyle: React.CSSProperties = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 900,
    fontSize: 160,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
};

export const AntigravityMain: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const text = "Antigravity";
    const characters = text.split("");

    return (
        <div style={{ flex: 1, backgroundColor: 'black', position: 'relative' }}>
            <Background />
            <div style={textStyle}>
                {characters.map((char, i) => {
                    const delay = i * 3;
                    const spr = spring({
                        frame: frame - delay,
                        fps,
                        config: {
                            stiffness: 100,
                            damping: 10,
                        },
                    });

                    const opacity = interpolate(spr, [0, 1], [0, 1]);
                    const scale = interpolate(spr, [0, 1], [0.5, 1]);
                    const translateY = interpolate(spr, [0, 1], [50, 0]);
                    const blur = interpolate(spr, [0, 1], [20, 0]);

                    return (
                        <span
                            key={i}
                            style={{
                                display: 'inline-block',
                                opacity,
                                transform: `scale(${scale}) translateY(${translateY}px)`,
                                filter: `blur(${blur}px)`,
                                color: 'white',
                                textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(93, 63, 211, 0.8)',
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};
