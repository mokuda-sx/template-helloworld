import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const Background: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Moving gradient blobs
    const blob1X = interpolate(
        Math.sin(frame / 60) * 100,
        [-100, 100],
        [width * 0.2, width * 0.8]
    );
    const blob1Y = interpolate(
        Math.cos(frame / 45) * 100,
        [-100, 100],
        [height * 0.2, height * 0.8]
    );

    const blob2X = interpolate(
        Math.cos(frame / 70) * 100,
        [-100, 100],
        [width * 0.8, width * 0.2]
    );
    const blob2Y = interpolate(
        Math.sin(frame / 55) * 100,
        [-100, 100],
        [height * 0.8, height * 0.2]
    );

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: '#050505',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Blob 1 */}
            <div
                style={{
                    position: 'absolute',
                    width: 800,
                    height: 800,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(93, 63, 211, 0.4) 0%, rgba(0,0,0,0) 70%)',
                    left: blob1X - 400,
                    top: blob1Y - 400,
                    filter: 'blur(80px)',
                }}
            />
            {/* Blob 2 */}
            <div
                style={{
                    position: 'absolute',
                    width: 700,
                    height: 700,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, rgba(0,0,0,0) 70%)',
                    left: blob2X - 350,
                    top: blob2Y - 350,
                    filter: 'blur(60px)',
                }}
            />

            {/* Scanline effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
                    backgroundSize: '100% 4px, 3px 100%',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};
