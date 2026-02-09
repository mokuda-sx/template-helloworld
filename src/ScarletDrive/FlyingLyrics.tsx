import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, AbsoluteFill, interpolate } from 'remotion';
import { LYRICS_DATA } from './LyricsData';
import { getCameraPath } from './CameraUtils';

interface FlyingLyricsProps {
    camPos: [number, number, number];
    camTarget: [number, number, number];
    roll: number;
}

/** 
 * ARUKU AROUND - CLARITY ENGINE (v3)
 * - DYNAMIC ANCHORING: Text is placed relative to where the camera will be, ensuring it's always in view.
 * - SEQUENTIAL DEPTH: Characters are spaced in time and space to eliminate overlaps.
 * - CONTRAST FIX: Stark black backgrounds behind giant neon letters.
 */

export const FlyingLyrics: React.FC<FlyingLyricsProps> = ({ camPos, camTarget, roll }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const [cx, cy, cz] = camPos;
    const [tx, ty, tz] = camTarget;

    const fz = tz - cz;
    const fx = tx - cx;
    const fy = ty - cy;
    const fl = Math.sqrt(fx * fx + fy * fy + fz * fz);

    const fdx = fx / fl;
    const fdy = fy / fl;
    const fdz = fz / fl;

    const rx_raw = fdz;
    const rz_raw = -fdx;
    const rl = Math.sqrt(rx_raw * rx_raw + rz_raw * rz_raw);
    const rdx = rx_raw / rl;
    const rdz = rz_raw / rl;

    const udx = fdy * rdz;
    const udy = fdz * rdx - fdx * rdz;
    const udz = -fdy * rdx;

    const project = (px: number, py: number, pz: number) => {
        const dx = px - cx;
        const dy = py - cy;
        const dz = pz - cz;
        const vz = dx * fdx + dy * fdy + dz * fdz;
        if (vz < 0.1) return null;
        const vx = dx * rdx + dz * rdz;
        const vy = dx * udx + dy * udy + dz * udz;
        const scale = 1100 / vz;
        return { x: width / 2 + vx * scale, y: height / 2 - vy * scale, scale, vz };
    };

    const allChars = useMemo(() => {
        return LYRICS_DATA.flatMap((line, lineIdx) => {
            const chars = line.text.split('');

            // ANCHOR: Find where the camera will be at the very start of this line
            const lineStartPos = getCameraPath(line.startFrame).pos;

            // Offset from the camera path to keep text at the periphery but in view
            const offsetX = (lineIdx % 2 === 0 ? 1 : -1) * 15;
            const offsetY = 5;

            return chars.map((char, charIdx) => {
                // Impact time (arrival at camera plane)
                const targetFrame = line.startFrame + (charIdx * 6.0);
                const arrivalCamPos = getCameraPath(targetFrame).pos; // CAMERA POS AT ARRIVAL

                return {
                    char,
                    z: arrivalCamPos[2],
                    // Positioned exactly where the camera will pass, but offset to the side
                    x: arrivalCamPos[0] + offsetX + (charIdx * 2.5),
                    y: arrivalCamPos[1] + offsetY - (charIdx * 1.5),
                    targetFrame
                };
            });
        });
    }, []);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none', overflow: 'hidden' }}>
            {allChars.map((item, i) => {
                // 1.5-second window for each character
                if (frame < item.targetFrame - 60 || frame > item.targetFrame + 1) return null;

                const proj = project(item.x, item.y, item.z);
                if (!proj) return null;

                const distanceZ = item.z - cz;
                const opacity = interpolate(distanceZ, [0, 5, 40, 60], [0, 1, 1, 0]);
                if (opacity <= 0) return null;

                const skewX = Math.max(-10, Math.min(10, (proj.x - width / 2) / 140));
                const skewY = Math.max(-8, Math.min(8, (proj.y - height / 2) / 140));

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: proj.x,
                            top: proj.y,
                            transform: `translate(-50%, -50%) scale(${Math.min(proj.scale / 15, 12)}) skew(${skewX}deg, ${skewY}deg) rotate(${roll * 10}deg)`,
                            color: 'white',
                            fontSize: 180,
                            fontWeight: 900,
                            textShadow: `0 0 50px rgba(0, 0, 0, 1), 10px 10px 0px rgba(255, 0, 80, 1)`,
                            opacity,
                            fontFamily: 'Outfit, sans-serif',
                            WebkitTextStroke: '2px rgba(255, 255, 255, 0.7)'
                        }}
                    >
                        {item.char}
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
