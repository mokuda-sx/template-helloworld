import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';

const LYRICS = [
    { start: 30, end: 90, text: "Burning through the digital night" },
    { start: 100, end: 160, text: "Red engine screaming in the light" },
    { start: 170, end: 230, text: "No more limits, no more chains" },
    { start: 240, end: 300, text: "Scarlet drive in our veins" },
];

export const Lyrics: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 250,
            pointerEvents: 'none',
        }}>
            {LYRICS.map((lyric, i) => {
                const opacity = interpolate(
                    frame,
                    [lyric.start, lyric.start + 10, lyric.end - 10, lyric.end],
                    [0, 1, 1, 0],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                if (opacity <= 0) return null;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            color: 'white',
                            fontSize: 70,
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            opacity,
                            textAlign: 'center',
                            textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px #ff0033',
                            transform: `translateY(${interpolate(frame, [lyric.start, lyric.end], [20, 0])}px)`,
                        }}
                    >
                        {lyric.text}
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
