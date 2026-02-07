import { useCurrentFrame, useVideoConfig, Audio, staticFile, AbsoluteFill } from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';
import { ThreeDScene } from './ThreeDScene';
import { LyricVisualizer } from './LyricVisualizer';
import { AudioVisualizer } from './AudioVisualizer';
import { FuturisticHUD } from './FuturisticHUD';

export const ScarletDriveMV: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const audioUrl = staticFile("スカーレットドライブc.mp3");

    // Audio Analysis (This hook will only work in Studio or during render)
    // For simplicity in this showcase, we'll use a simulated beat if audio data isn't ready
    const audioData = useAudioData(audioUrl);

    const frequencyData = audioData ? visualizeAudio({
        audioData,
        frame,
        fps,
        numberOfSamples: 16,
    }) : new Array(16).fill(0).map(() => Math.sin(frame / 5) * 0.5 + 0.5);

    const averageFreq = frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;

    // Camera shake/pulse based on audio
    const pulseScale = 1 + averageFreq * 0.05;
    const shakeX = (Math.random() - 0.5) * averageFreq * 20;
    const shakeY = (Math.random() - 0.5) * averageFreq * 20;

    return (
        <AbsoluteFill style={{
            backgroundColor: 'black',
            transform: `scale(${pulseScale}) translate(${shakeX}px, ${shakeY}px)`,
            overflow: 'hidden'
        }}>
            <Audio src={audioUrl} />

            {/* 3D Background */}
            <ThreeDScene />

            {/* Bottom Visualizer */}
            <AudioVisualizer />

            {/* HUD Elements */}
            <FuturisticHUD />

            {/* Lyric Visualizer */}
            <LyricVisualizer audioData={audioData} />

            {/* Post Processing Overlays */}
            <AbsoluteFill style={{
                pointerEvents: 'none',
                background: 'radial-gradient(circle, transparent 40%, rgba(255, 0, 51, 0.2) 100%)',
                mixBlendMode: 'overlay'
            }} />

            {/* Flash on beat */}
            {averageFreq > 0.8 && (
                <AbsoluteFill style={{
                    backgroundColor: 'white',
                    opacity: 0.1,
                    pointerEvents: 'none'
                }} />
            )}

            {/* VHS Effect */}
            <AbsoluteFill style={{
                pointerEvents: 'none',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 4px, 3px 100%',
                zIndex: 100,
                opacity: 0.2,
            }} />
        </AbsoluteFill>
    );
};
