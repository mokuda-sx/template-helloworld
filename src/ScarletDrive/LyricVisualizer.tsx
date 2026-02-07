import React, { useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { LYRICS_DATA, LyricLine } from './LyricsData';
import { findNearestPeak } from './AudioUtils';

const LyricItem: React.FC<{ line: LyricLine, audioData: any }> = ({ line, audioData }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Snap the start frame to the nearest audio peak
    const snappedStartFrame = useMemo(() => {
        return findNearestPeak(line.startFrame, audioData);
    }, [line.startFrame, audioData]);

    const relativeFrame = frame - snappedStartFrame;

    const spr = spring({
        frame: relativeFrame,
        fps,
        config: { stiffness: 100, damping: 10 },
    });

    const exitSpr = spring({
        frame: frame - (line.endFrame - 10),
        fps,
        config: { stiffness: 100, damping: 20 },
    });

    if (frame < snappedStartFrame || frame > line.endFrame) return null;

    const opacity = interpolate(spr, [0, 1], [0, 1]) * interpolate(exitSpr, [0, 1], [1, 0]);

    if (line.style === 'giant') {
        const scale = interpolate(spr, [0, 1], [4, 1]);
        return (
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    fontSize: 200,
                    fontWeight: 900,
                    color: 'white',
                    opacity,
                    transform: `scale(${scale})`,
                    textShadow: '0 0 30px #ff0033, 0 0 60px #ff0033',
                    textAlign: 'center',
                }}>
                    {line.text}
                </div>
            </AbsoluteFill>
        );
    }

    if (line.style === 'glitch') {
        const x = Math.random() * 20 - 10;
        const color = frame % 2 === 0 ? '#ff0033' : '#00ffff';
        return (
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    fontSize: 120,
                    fontWeight: 800,
                    color: 'white',
                    opacity,
                    transform: `translateX(${x}px)`,
                    textShadow: `2px 2px 0px ${color}, -2px -2px 0px #ff0033`,
                    letterSpacing: '0.2em',
                }}>
                    {line.text}
                </div>
            </AbsoluteFill>
        );
    }

    if (line.style === 'slide') {
        const translateX = interpolate(spr, [0, 1], [-500, 0]);
        return (
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 100 }}>
                <div style={{
                    fontSize: 100,
                    fontWeight: 700,
                    color: 'white',
                    opacity,
                    transform: `translateX(${translateX}px) skewX(-20deg)`,
                    borderLeft: '20px solid #ff0033',
                    paddingLeft: 40,
                }}>
                    {line.text}
                </div>
            </AbsoluteFill>
        );
    }

    if (line.style === 'threeD') {
        const rotateY = interpolate(spr, [0, 1], [90, 0]);
        const translateZ = interpolate(spr, [0, 1], [-1000, 0]);
        return (
            <AbsoluteFill style={{
                justifyContent: 'center',
                alignItems: 'center',
                perspective: '1000px'
            }}>
                <div style={{
                    fontSize: 150,
                    fontWeight: 900,
                    color: '#ff0033',
                    opacity,
                    transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                    textShadow: '0 0 20px white',
                }}>
                    {line.text}
                </div>
            </AbsoluteFill>
        );
    }

    // Standard
    const translateY = interpolate(spr, [0, 1], [50, 0]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: 300 }}>
            <div style={{
                fontSize: 80,
                fontWeight: 600,
                color: 'white',
                opacity,
                transform: `translateY(${translateY}px)`,
            }}>
                {line.text}
            </div>
        </AbsoluteFill>
    );
};

export const LyricVisualizer: React.FC<{ audioData: any }> = ({ audioData }) => {
    return (
        <>
            {LYRICS_DATA.map((line, i) => (
                <LyricItem key={i} line={line} audioData={audioData} />
            ))}
        </>
    );
};
