import React, { useRef, useEffect } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

const FRAGMENT_SHADER = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uBeat;
uniform vec3 uCamPos;
uniform vec3 uCamTarget;
uniform float uRoll;

float hash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
}

// VERY SPARSE DISTANCE FIELD
float map(vec3 p) {
    // Cell size 70.0 (Extremely rare objects, massive scale)
    vec3 cell = floor(p / 70.0);
    vec3 localP = mod(p, 70.0) - 35.0;
    
    // Clear path (25 units clearance around camera lane)
    float pathDist = length(p.xy - vec2(0.0, 5.0)) - 25.0;
    
    float h = hash(cell);
    if (h < 0.85 || pathDist < 0.0) return 70.0; 
    
    localP += (vec3(hash(cell+1.1), hash(cell+1.2), hash(cell+1.3)) - 0.5) * 20.0;
    
    float d;
    if (h > 0.96) {
        d = length(localP) - (12.0 + uBeat * 8.0); // Colossal spheres
    } else {
        vec3 b = vec3(10.0 + h * 8.0); // Colossal boxes
        vec3 q = abs(localP) - b;
        d = length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - 1.0;
    }
    
    return d;
}

vec3 getNormal(vec3 p) {
    float e = 0.05; // Large epsilon for large stable surfaces
    vec3 n = vec3(
        map(p + vec3(e, 0, 0)) - map(p - vec3(e, 0, 0)),
        map(p + vec3(0, e, 0)) - map(p - vec3(0, e, 0)),
        map(p + vec3(0, 0, e)) - map(p - vec3(0, 0, e))
    );
    return normalize(n);
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
    
    vec3 ro = uCamPos; 
    vec3 ta = uCamTarget; 
    vec3 f = normalize(ta - ro);
    vec3 r_base = normalize(cross(vec3(0, 1, 0), f));
    vec3 u_base = cross(f, r_base);
    
    float s = sin(uRoll);
    float c = cos(uRoll);
    vec3 r = r_base * c + u_base * s;
    vec3 u = u_base * c - r_base * s;
    
    vec3 rd = normalize(f + uv.x * r + uv.y * u); 

    // STABILITY OVERDRIVE: 
    // Reduced step factor to 0.5 rules out most 'zebra' artifacts on massive planes.
    float t = 0.0;
    bool hit = false;
    for(int i = 0; i < 160; i++) {
        float d = map(ro + rd * t);
        if(d < 0.01) { hit = true; break; } 
        if (t > 400.0) break;
        t += d * 0.5; 
    }

    vec3 sky = vec3(0.3, 0.05, 0.2);
    vec3 col = sky; 
    
    if(hit) {
        vec3 p = ro + rd * t;
        vec3 nor = getNormal(p);
        float li = dot(nor, normalize(vec3(1, 2, 3))) * 0.5 + 0.5;
        
        vec3 scarlet = vec3(1.0, 0.1, 0.4);
        col = scarlet * (li + 0.3); // High ambient
        
        float spec = pow(max(dot(reflect(-normalize(vec3(1,2,3)), nor), -rd), 0.0), 60.0);
        col += spec * 1.0;

        float fog = 1.0 - exp(-0.005 * t); // Very light fog for distance
        col = mix(col, sky, fog);
        col += scarlet * uBeat * 1.0; 
    }
    
    // Smooth atmospheric bloom
    col += vec3(1.0, 0.2, 0.4) * (2.0 / (5.0 + t)) * (0.8 + uBeat * 2.0);

    col = pow(col, vec3(0.55));
    gl_FragColor = vec4(col * 1.8, 1.0);
}
`;

const VERTEX_SHADER = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

interface ShaderBackgroundProps {
    beat: number;
    camPos: [number, number, number];
    camTarget: [number, number, number];
    roll: number;
}

export const ShaderBackground: React.FC<ShaderBackgroundProps> = ({ beat, camPos, camTarget, roll }) => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const programRef = useRef<WebGLProgram | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        if (!programRef.current) {
            const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
                const shader = gl.createShader(type)!;
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                return shader;
            };
            const program = gl.createProgram()!;
            gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
            gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
            gl.linkProgram(program);
            programRef.current = program;
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        }

        const program = programRef.current;
        gl.useProgram(program);
        const posAttrib = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(posAttrib);
        gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1f(gl.getUniformLocation(program, 'uTime'), frame / fps);
        gl.uniform2f(gl.getUniformLocation(program, 'uResolution'), width, height);
        gl.uniform1f(gl.getUniformLocation(program, 'uBeat'), beat);
        gl.uniform3f(gl.getUniformLocation(program, 'uCamPos'), ...camPos);
        gl.uniform3f(gl.getUniformLocation(program, 'uCamTarget'), ...camTarget);
        gl.uniform1f(gl.getUniformLocation(program, 'uRoll'), roll);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }, [frame, width, height, fps, beat, camPos, camTarget, roll]);

    return <canvas ref={canvasRef} width={width} height={height} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
};
