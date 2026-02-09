import React, { useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { LYRICS_DATA, LyricLine } from './LyricsData';

const LyricItem: React.FC<{ line: LyricLine }> = ({ line }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const relativeFrame = frame - line.startFrame;
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

    const opacity = interpolate(spr, [0, 1], [0, 1]) * interpolate(exitSpr, [0, 1], [1, 0]);

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: 300 }}>
            <div style={{ fontSize: 80, fontWeight: 600, color: 'white', opacity, transform: `translateY(${interpolate(spr, [0, 1], [20, 0])}px)` }}>
                {line.text}
            </div>
        </AbsoluteFill>
    );
};

export const LyricVisualizer: React.FC<{ audioData: any }> = ({ audioData }) => {
    const frame = useCurrentFrame();

    // Map lyrics directly to only active ones
    const activeLines = useMemo(() => {
        return LYRICS_DATA.filter(l => frame >= l.startFrame - 10 && frame <= l.endFrame + 10);
    }, [frame]);

    return (
        <>
            {activeLines.map((line) => (
                <LyricItem key={line.startFrame} line={line} />
            ))}
        </>
    );
};
