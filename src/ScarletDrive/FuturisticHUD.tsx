import React from 'react';
import { useCurrentFrame } from 'remotion';

export const FuturisticHUD: React.FC = () => {
    const frame = useCurrentFrame();
    const rotation = (frame / 120) * 360;

    return (
        <div style={{
            position: 'absolute',
            top: 150,
            right: 150,
            width: 250,
            height: 250,
            perspective: '1000px',
        }}>
            {/* Rotating Rings */}
            <div style={{
                position: 'absolute',
                inset: 0,
                border: '2px solid rgba(255, 0, 51, 0.4)',
                borderRadius: '50%',
                transform: `rotateY(${rotation}deg) rotateX(45deg)`,
                boxShadow: '0 0 10px rgba(255, 0, 51, 0.3)',
            }} />
            <div style={{
                position: 'absolute',
                inset: 40,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                transform: `rotateY(${-rotation * 1.5}deg) rotateZ(30deg)`,
            }} />

            {/* Scanning Logic Details */}
            <div style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                width: '100%',
                color: '#ff0033',
                fontFamily: 'monospace',
                fontSize: 12,
                textAlign: 'right',
                textShadow: '0 0 5px #ff0033',
            }}>
                <div>SYSTEM_STATUS: ACTIVE</div>
                <div>POSITION_X: {Math.sin(frame / 20).toFixed(4)}</div>
                <div>POWER_LOAD: {(85 + Math.random() * 5).toFixed(1)}%</div>
                <div>AI_MODEL: SCARLET_V2</div>
            </div>

            {/* Center Core */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 20,
                height: 20,
                backgroundColor: 'white',
                boxShadow: '0 0 20px white, 0 0 40px #ff0033',
                transform: 'translate(-50%, -50%)',
                borderRadius: '2px',
            }} />
        </div>
    );
};
