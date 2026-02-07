import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const ScarletBackground: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const lines = 12;

    return (
        <div style={{ flex: 1, backgroundColor: '#050000', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 2,
                backgroundColor: '#ff0033',
                boxShadow: '0 0 20px #ff0033',
                zIndex: 2,
            }} />

            <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                bottom: 0,
                perspective: '500px',
                perspectiveOrigin: '50% 0%',
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    transform: 'rotateX(60deg)',
                    transformOrigin: 'top center',
                }}>
                    {[...Array(20)].map((_, i) => {
                        const progress = ((frame * 2 + i * 50) % 1000) / 1000;
                        const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    top: `${progress * 100}%`,
                                    left: 0,
                                    right: 0,
                                    height: 2,
                                    backgroundColor: '#ff0033',
                                    boxShadow: '0 0 10px #ff0033',
                                    opacity,
                                }}
                            />
                        );
                    })}

                    {[...Array(lines)].map((_, i) => {
                        const x = (i / (lines - 1)) * 100;
                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: `${x}%`,
                                    width: 2,
                                    backgroundColor: '#ff0033',
                                    boxShadow: '0 0 10px #ff0033',
                                    opacity: 0.3,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
