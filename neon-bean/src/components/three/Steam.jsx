import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Steam — Rising translucent particles above the coffee cup.
 * Uses a custom particle system with Points geometry.
 */
const PARTICLE_COUNT = 40;

export default function Steam() {
  const pointsRef = useRef();

  /* ---- Generate initial particle data ---- */
  const { positions, velocities, opacities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const opa = new Float32Array(PARTICLE_COUNT);
    const life = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      resetParticle(i, pos, vel, opa, life);
      // Stagger initial lifetimes so particles don't all start at once
      life[i] = Math.random();
    }

    return { positions: pos, velocities: vel, opacities: opa, lifetimes: life };
  }, []);

  /* ---- Animate particles each frame ---- */
  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const posArr = pointsRef.current.geometry.attributes.position.array;
    const opaArr = pointsRef.current.geometry.attributes.opacity.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Advance lifetime
      lifetimes[i] += delta * 0.3;

      if (lifetimes[i] > 1.0) {
        // Reset when lifetime expires
        resetParticle(i, posArr, velocities, opaArr, lifetimes);
      } else {
        // Move upward with slight drift
        posArr[i3] += velocities[i3] * delta;
        posArr[i3 + 1] += velocities[i3 + 1] * delta;
        posArr[i3 + 2] += velocities[i3 + 2] * delta;

        // Add subtle horizontal sway
        posArr[i3] += Math.sin(lifetimes[i] * 4 + i) * 0.002;

        // Fade in then out based on lifetime
        const t = lifetimes[i];
        opaArr[i] = t < 0.2 ? t / 0.2 : 1.0 - (t - 0.2) / 0.8;
        opaArr[i] *= 0.4; // max opacity
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  /* ---- Custom shader material for per-particle opacity ---- */
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {},
        vertexShader: `
          attribute float opacity;
          varying float vOpacity;
          void main() {
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 8.0 * (3.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying float vOpacity;
          void main() {
            // Soft circle shape
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, dist) * vOpacity;
            gl_FragColor = vec4(0.94, 0.89, 0.80, alpha);
          }
        `,
      }),
    []
  );

  return (
    <points ref={pointsRef} position={[0, 1.6, 0]} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={PARTICLE_COUNT}
          array={opacities}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
}

/**
 * Resets a single particle to its starting state.
 */
function resetParticle(i, positions, velocities, opacities, lifetimes) {
  const i3 = i * 3;
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 0.4;

  // Start near the coffee surface center
  positions[i3] = Math.cos(angle) * radius;
  positions[i3 + 1] = 0;
  positions[i3 + 2] = Math.sin(angle) * radius;

  // Rise upward with slight random drift
  velocities[i3] = (Math.random() - 0.5) * 0.15;
  velocities[i3 + 1] = 0.4 + Math.random() * 0.3; // upward speed
  velocities[i3 + 2] = (Math.random() - 0.5) * 0.15;

  opacities[i] = 0;
  lifetimes[i] = 0;
}

