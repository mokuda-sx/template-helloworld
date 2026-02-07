import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { useVideoConfig, useCurrentFrame, interpolate } from 'remotion';
import * as THREE from 'three';

const Road: React.FC<{ frame: number }> = ({ frame }) => {
    const { width, height } = useVideoConfig();

    // Create a grid material that looks like neon road
    const gridTexture = useMemo(() => {
        const size = 512;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        ctx.strokeStyle = '#ff0033';
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, size, size);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 50);
        return texture;
    }, []);

    const offset = (frame * 0.2) % 1;
    gridTexture.offset.y = -offset;

    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -20]}>
                <planeGeometry args={[100, 200]} />
                <meshBasicMaterial map={gridTexture} transparent opacity={0.6} />
            </mesh>

            {/* Perspective Side Pillars */}
            {[...Array(20)].map((_, i) => {
                const z = -i * 10 + (frame * 0.5) % 10;
                return (
                    <group key={i}>
                        <mesh position={[-10, 0, z]}>
                            <boxGeometry args={[0.5, 10, 0.5]} />
                            <meshBasicMaterial color="#ff0033" />
                        </mesh>
                        <mesh position={[10, 0, z]}>
                            <boxGeometry args={[0.5, 10, 0.5]} />
                            <meshBasicMaterial color="#ff0033" />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
};

export const ThreeDScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <ThreeCanvas linear width={1920} height={1080}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <fog attach="fog" args={['#000', 10, 50]} />
            <Road frame={frame} />
        </ThreeCanvas>
    );
};
