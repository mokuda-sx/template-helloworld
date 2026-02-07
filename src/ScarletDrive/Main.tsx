import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, staticFile, AbsoluteFill } from 'remotion';
import { ScarletBackground } from './Background';
import { AudioVisualizer } from './AudioVisualizer';
import { FuturisticHUD } from './FuturisticHUD';
import { Lyrics } from './Lyrics';

const titleStyle: React.CSSProperties = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: 900,
    fontSize: 140,
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    lineHeight: 1,
    textShadow: '0 0 20px #ff0033, 0 0 40px #ff0033, 0 0 80px #ff0033',
};

export const ScarletDriveMain: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const titleSpring = spring({
        frame,
        fps,
        config: {
            stiffness: 100,
            damping: 10,
        },
    });

    const titleScale = interpolate(titleSpring, [0, 1], [0.7, 1]);
    const titleOpacity = interpolate(frame, [0, 45], [0, 1]);
    const titleBlur = interpolate(frame, [0, 30], [40, 0]);

    // Pulsing effect based on "beat" (simulated for now)
    const pulse = Math.sin(frame / 5) * 0.02 + 1;

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <ScarletBackground />

            {/* Visualizer Showcase */}
            <AudioVisualizer />

            {/* AI HUD Showcase */}
            <FuturisticHUD />

            {/* Lyrics Showcase */}
            <Lyrics />

            {/* The "Sun" / Horizon Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 600,
                height: 600,
                background: 'radial-gradient(circle, rgba(255, 0, 51, 0.4) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                opacity: 0.6 + Math.sin(frame / 20) * 0.2,
                filter: 'blur(50px)',
            }} />

            {/* Audio integration */}
            <Audio src={staticFile("スカーレットドライブc.mp3")} />

            {/* Main Title */}
            <AbsoluteFill style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                transform: `scale(${pulse})`,
            }}>
                <div style={{
                    ...titleStyle,
                    transform: `scale(${titleScale}) translateY(${interpolate(frame, [0, 60], [50, 0], { extrapolateRight: 'clamp' })}px)`,
                    opacity: titleOpacity,
                    filter: `blur(${titleBlur}px)`,
                }}>
                    SCARLET<br />
                    <span style={{ fontSize: 100, color: '#ff0033', textShadow: '0 0 20px white' }}>DRIVE</span>
                </div>

                {/* Decorative scanning line */}
                <div style={{
                    width: interpolate(frame, [30, 60], [0, 500], { extrapolateRight: 'clamp' }),
                    height: 2,
                    backgroundColor: '#ff0033',
                    marginTop: 40,
                    boxShadow: '0 0 15px #ff0033',
                    opacity: interpolate(frame, [30, 45], [0, 1]),
                }} />
            </AbsoluteFill>

            {/* Glitch Overlay (Ocassional) */}
            {frame % 100 > 95 && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(255, 0, 51, 0.2)',
                    zIndex: 10,
                    mixBlendMode: 'overlay',
                }} />
            )}

            {/* Speed Particles */}
            {[...Array(30)].map((_, i) => {
                const particleDelay = (i * 13) % 200;
                const particleFrame = (frame + particleDelay) % 60;
                const particleProgress = particleFrame / 60;

                const angle = (i / 30) * Math.PI * 2;
                const radius = interpolate(particleProgress, [0, 1], [0, 1000]);
                const px = Math.cos(angle) * radius + width / 2;
                const py = Math.sin(angle) * radius + height / 2;
                const pSize = interpolate(particleProgress, [0, 1], [0, 10]);

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: px,
                            top: py,
                            width: pSize,
                            height: pSize,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px #ff0033',
                            opacity: interpolate(particleProgress, [0, 0.8, 1], [0, 1, 0]),
                        }}
                    />
                );
            })}

            {/* VHS SCANLINE OVERLAY */}
            <AbsoluteFill style={{
                pointerEvents: 'none',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 4px, 3px 100%',
                zIndex: 100,
                opacity: 0.3,
            }} />
        </AbsoluteFill>
    );
};
