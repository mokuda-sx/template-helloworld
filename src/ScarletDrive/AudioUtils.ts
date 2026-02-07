/**
 * Detects if a frame is near a "beat" (audio peak).
 * Returns a value from 0 to 1 representing the beat intensity.
 */
export const getBeatIntensity = (
    frame: number,
    audioData: any,
    threshold = 0.5
) => {
    if (!audioData || !audioData.channelWaveform || !audioData.channelWaveform[0]) return 0;

    // Check frequencies around the beat (low end usually represents the kick/bass beat)
    const samples = audioData.channelWaveform[0]; // Just use first channel
    const fps = 30; // Hardcoded for now

    const sampleIndex = Math.floor((frame / fps) * audioData.sampleRate);
    if (sampleIndex >= samples.length || sampleIndex < 0) return 0;

    // Average intensity around the current sample
    const windowSize = 512;
    let sum = 0;
    let count = 0;
    for (let i = 0; i < windowSize; i++) {
        const idx = sampleIndex + i - (windowSize / 2);
        if (idx >= 0 && idx < samples.length) {
            sum += Math.abs(samples[idx]);
            count++;
        }
    }

    const intensity = count > 0 ? sum / count : 0;
    // Normalize intensity. Usually waveform values are between 0 and 1.
    return intensity > threshold ? (intensity - threshold) / (1 - threshold) : 0;
};

/**
 * Finds the nearest "peak" within a range.
 * Useful for snapping lyrics to the exact moment a drum hits.
 */
export const findNearestPeak = (
    targetFrame: number,
    audioData: any,
    searchRange = 10 // +/- frames
) => {
    if (!audioData || !audioData.channelWaveform) return targetFrame;

    let maxIntensity = -1;
    let peakFrame = targetFrame;

    for (let f = targetFrame - searchRange; f <= targetFrame + searchRange; f++) {
        const intensity = getBeatIntensity(f, audioData);
        if (intensity > maxIntensity) {
            maxIntensity = intensity;
            peakFrame = f;
        }
    }

    // If no strong intensity found, just return original
    return maxIntensity > 0.05 ? peakFrame : targetFrame;
};
