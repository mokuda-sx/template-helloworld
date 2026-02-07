import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
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

    // Overall scale pulse when the first character enters
    const mainSpr = spring({
        frame: frame - 5,
        fps,
        config: {
            stiffness: 100,
            damping: 20,
        },
    });
    const globalScale = interpolate(mainSpr, [0, 1], [0.98, 1]);

    return (
        <div style={{ flex: 1, backgroundColor: 'black', position: 'relative', transform: `scale(${globalScale})` }}>
            <Background />

            {/* Background Music */}
            <Audio src={staticFile("bgm.mp3")} volume={0.4} />

            <div style={textStyle}>
                {characters.map((char, i) => {
                    const delay = i * 2; // Faster entry
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
                        <React.Fragment key={i}>
                            {/* Small pop sound for each letter */}
                            <Audio
                                src={staticFile("sfx.mp3")}
                                volume={interpolate(frame, [delay, delay + 5], [0.15, 0], { extrapolateRight: 'clamp' })}
                                startFrom={20}
                            />
                            <span
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
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
