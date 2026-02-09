import { useCurrentFrame, useVideoConfig, Audio, staticFile, AbsoluteFill } from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';
import { ShaderBackground } from './ShaderBackground';
import { FlyingLyrics } from './FlyingLyrics';
import { getCameraPath } from './CameraUtils';
import React from 'react';

export const ScarletDriveMV: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const audioUrl = staticFile("スカーレットドライブc.mp3");
    const audioData = useAudioData(audioUrl);

    const frequencyData = audioData ? visualizeAudio({
        audioData,
        frame,
        fps,
        numberOfSamples: 16,
    }) : new Array(16).fill(0).map(() => 0.1);

    const averageFreq = frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;

    // SYNCED CAMERA ACTION
    const { pos, target, roll } = getCameraPath(frame);

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', overflow: 'hidden' }}>
            <Audio src={audioUrl} />

            {/* High-Resolution Unified 3D Space */}
            <ShaderBackground
                beat={averageFreq * 3.5}
                camPos={pos}
                camTarget={target}
                roll={roll}
            />

            {/* Smart-Positioned Synchronized Typography */}
            <FlyingLyrics
                camPos={pos}
                camTarget={target}
                roll={roll}
            />

            {/* Final Cinematic Grade */}
            <AbsoluteFill style={{
                pointerEvents: 'none',
                background: 'radial-gradient(circle, transparent 40%, rgba(255, 0, 80, 0.08) 100%)',
                boxShadow: 'inset 0 0 600px rgba(0,0,0,1)'
            }} />
        </AbsoluteFill>
    );
};
