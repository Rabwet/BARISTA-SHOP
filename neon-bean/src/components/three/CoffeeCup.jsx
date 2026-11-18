import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CoffeeCup — A procedural 3D coffee cup built entirely from primitives.
 * No external model files required.
 *
 * @param {number} scrollProgress - 0–1 scroll-linked tilt value
 * @param {{ x: number, y: number }} mouse - normalized mouse coords (-1 to 1)
 */
export default function CoffeeCup({ scrollProgress = 0, mouse = { x: 0, y: 0 } }) {
  const groupRef = useRef();

  /* ---- Cup body profile (LatheGeometry) ---- */
  const cupPoints = useMemo(() => {
    const pts = [];
    // Bottom center to base edge
    pts.push(new THREE.Vector2(0.0, 0.0));
    pts.push(new THREE.Vector2(0.3, 0.0));
    pts.push(new THREE.Vector2(0.5, 0.02));
    pts.push(new THREE.Vector2(0.58, 0.05));
    // Curve up from base
    pts.push(new THREE.Vector2(0.60, 0.10));
    pts.push(new THREE.Vector2(0.62, 0.20));
    pts.push(new THREE.Vector2(0.65, 0.35));
    pts.push(new THREE.Vector2(0.68, 0.50));
    pts.push(new THREE.Vector2(0.72, 0.65));
    pts.push(new THREE.Vector2(0.77, 0.80));
    pts.push(new THREE.Vector2(0.82, 0.95));
    pts.push(new THREE.Vector2(0.87, 1.10));
    pts.push(new THREE.Vector2(0.92, 1.25));
    // Slight flare near rim
    pts.push(new THREE.Vector2(0.96, 1.35));
    pts.push(new THREE.Vector2(0.98, 1.42));
    pts.push(new THREE.Vector2(1.00, 1.48));
    // Rim lip
    pts.push(new THREE.Vector2(1.02, 1.50));
    pts.push(new THREE.Vector2(1.00, 1.52));
    // Inner wall (for thickness)
    pts.push(new THREE.Vector2(0.92, 1.50));
    pts.push(new THREE.Vector2(0.88, 1.40));
    return pts;
  }, []);

  /* ---- Saucer profile (LatheGeometry) ---- */
  const saucerPoints = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0.0, 0.0));
    pts.push(new THREE.Vector2(0.6, 0.0));
    pts.push(new THREE.Vector2(0.9, 0.02));
    pts.push(new THREE.Vector2(1.15, 0.05));
    pts.push(new THREE.Vector2(1.30, 0.08));
    pts.push(new THREE.Vector2(1.35, 0.10));
    // Slight lip at the edge
    pts.push(new THREE.Vector2(1.38, 0.12));
    pts.push(new THREE.Vector2(1.35, 0.15));
    pts.push(new THREE.Vector2(1.30, 0.13));
    pts.push(new THREE.Vector2(1.15, 0.10));
    pts.push(new THREE.Vector2(0.9, 0.08));
    return pts;
  }, []);

  /* ---- Auto-rotation + mouse parallax + scroll tilt ---- */
  useFrame(() => {
    if (!groupRef.current) return;

    // Slow auto-rotation on Y axis
    groupRef.current.rotation.y += 0.003;

    // Mouse parallax: smoothly interpolate towards target rotation (±10°)
    const targetX = mouse.y * 0.175; // ~10° max
    const targetZ = mouse.x * -0.175;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX + scrollProgress * 0.3, // scroll adds forward tilt
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetZ,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* ---- Cup body ---- */}
      <mesh castShadow>
        <latheGeometry args={[cupPoints, 32]} />
        <meshStandardMaterial
          color="#4a3123"
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ---- Rim torus ---- */}
      <mesh position={[0, 1.51, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.01, 0.03, 12, 32]} />
        <meshStandardMaterial color="#efe2cc" roughness={0.3} metalness={0.15} />
      </mesh>

      {/* ---- Handle (half-torus) ---- */}
      <mesh
        position={[1.1, 0.85, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.6, 0.5, 0.5]}
      >
        <torusGeometry args={[0.5, 0.06, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#4a3123" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* ---- Coffee surface ---- */}
      <mesh position={[0, 1.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 32]} />
        <meshStandardMaterial
          color="#1a0f0a"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* ---- Saucer ---- */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <latheGeometry args={[saucerPoints, 32]} />
        <meshStandardMaterial
          color="#5a3f2f"
          roughness={0.5}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ---- Neon rim light ---- */}
      <pointLight
        color="#39ff14"
        intensity={0.3}
        distance={3}
        position={[0, 1.8, 0]}
      />
    </group>
  );
}

