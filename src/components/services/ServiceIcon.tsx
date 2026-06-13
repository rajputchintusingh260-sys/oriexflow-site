"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Service } from "@/data/services";

/** Tiny rotating wireframe scene — one per service card. */
function Shape({ icon }: { icon: Service["icon"] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.4;
    ref.current.rotation.y = clock.elapsedTime * 0.55;
  });

  return (
    <mesh ref={ref}>
      {icon === "knot" && <torusKnotGeometry args={[0.85, 0.26, 100, 16]} />}
      {icon === "cube" && <boxGeometry args={[1.35, 1.35, 1.35]} />}
      {icon === "octa" && <octahedronGeometry args={[1.15, 0]} />}
      {icon === "rings" && <torusGeometry args={[1, 0.32, 16, 60]} />}
      <meshBasicMaterial wireframe color={icon === "cube" || icon === "rings" ? "#22d3ee" : "#7c5cff"} />
    </mesh>
  );
}

export default function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  return (
    <div className="h-20 w-20" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.4], fov: 40 }} dpr={1} gl={{ antialias: false, alpha: true }}>
        <Shape icon={icon} />
      </Canvas>
    </div>
  );
}
