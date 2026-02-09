import { interpolate } from 'remotion';

export const getCameraPath = (frame: number) => {
    const time = frame / 40;

    // Smooth Weaving
    const x = Math.sin(time * 0.6) * 35.0 + Math.cos(time * 1.2) * 15.0;
    const y = 5.0 + Math.sin(time * 0.4) * 12.0;

    // Constant progress + Surge
    // Surge calculation needs to be identical everywhere
    const surge = Math.pow(Math.sin(time * 0.5) * 0.5 + 0.5, 3.0) * 100.0;
    const z = time * 75.0 + surge;

    // Roll/Banking calculation
    const velX = Math.cos(time * 0.6) * 10.0;
    const roll = velX * 0.05;

    // Target (Looking ahead)
    const tx = x + Math.sin(time * 0.9) * 12.0;
    const ty = y - 2.0 + Math.cos(time * 0.5) * 8.0;
    const tz = z + 50.0;

    return {
        pos: [x, y, z] as [number, number, number],
        target: [tx, ty, tz] as [number, number, number],
        roll,
        velX
    };
};
