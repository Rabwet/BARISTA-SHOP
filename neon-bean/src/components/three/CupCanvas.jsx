import { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CoffeeCup from './CoffeeCup';
import Steam from './Steam';

/**
 * CupCanvas — Canvas wrapper that sets up the 3D scene.
 * This is the component meant to be lazy-loaded via React.lazy().
 *
 * @param {number} scrollProgress - 0–1 scroll progress from parent
 */
export default function CupCanvas({ scrollProgress = 0 }) {
  /* ---- Mouse tracking for parallax ---- */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e) => {
    // Normalize mouse position to -1..1 range based on canvas bounds
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouse({ x, y });
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 2, 5], fov: 45 }}
      onPointerMove={handlePointerMove}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* ---- Lighting setup ---- */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.3}
        color="#efe2cc"
      />

      {/* ---- 3D Cup + Steam ---- */}
      <CoffeeCup scrollProgress={scrollProgress} mouse={mouse} />
      <Steam />

      {/* ---- Orbit controls (view only, no zoom/pan) ---- */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
        autoRotate={false}
      />
    </Canvas>
  );
}

