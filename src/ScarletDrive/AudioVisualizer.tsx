import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const AudioVisualizer: React.FC = () => {
    const frame = useCurrentFrame();
    const bars = 20;

    return (
        <div style={{
            position: 'absolute',
            bottom: 100,
            left: '10%',
            right: '10%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: 200,
            opacity: 0.8,
        }}>
            {[...Array(bars)].map((_, i) => {
                // In a real app, you'd use @remotion/audio-utils to get frequency data here.
                // Simulating audio data based on frame and index
                const offset = i / bars;
                const loudness = Math.sin(frame / 5 + offset * 2) * 0.5 + 0.5;
                const noise = Math.sin(frame * 0.2 + i) * 20;

                const height = 20 + loudness * 150 + noise;
                const colorProgress = (i / bars);
                const color = `hsl(${interpolate(colorProgress, [0, 1], [340, 360])}, 100%, 50%)`;

                return (
                    <div
                        key={i}
                        style={{
                            width: `${(100 / bars) - 0.5}%`,
                            height: `${height}px`,
                            backgroundColor: color,
                            boxShadow: `0 0 15px ${color}`,
                            borderRadius: '2px 2px 0 0',
                        }}
                    />
                );
            })}
        </div>
    );
};
