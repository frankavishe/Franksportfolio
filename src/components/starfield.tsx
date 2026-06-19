"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useMotion } from "@/lib/motion-context";

type Pointer = { x: number; y: number };

function useWindowPointerAndScroll() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { pointer, scrollY };
}

type LayerConfig = {
  count: number;
  spread: number;
  depth: number;
  size: number;
  color: string;
  speed: number;
};

// Three depth layers ~= 280 stars total, within the 200-300 spec target.
const LAYERS: LayerConfig[] = [
  { count: 120, spread: 16, depth: -6, size: 0.045, color: "#e2e8f0", speed: 0.25 },
  { count: 90, spread: 22, depth: -10, size: 0.035, color: "#38bdf8", speed: 0.5 },
  { count: 70, spread: 30, depth: -16, size: 0.025, color: "#3b82f6", speed: 0.9 },
];

function StarLayer({
  config,
  pointer,
  scrollY,
  frozen,
}: {
  config: LayerConfig;
  pointer: RefObject<Pointer>;
  scrollY: RefObject<number>;
  frozen: boolean;
}) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(config.count * 3);
    for (let i = 0; i < config.count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * config.spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * config.spread;
      arr[i * 3 + 2] = config.depth + (Math.random() - 0.5) * 2;
    }
    return arr;
  }, [config]);

  useFrame((_, delta) => {
    if (frozen) return;
    const points = ref.current;
    if (!points) return;

    points.rotation.y += delta * 0.015 * config.speed;

    const targetX = pointer.current.x * config.speed * 0.6;
    const targetY = pointer.current.y * config.speed * 0.6 - scrollY.current * 0.0015 * config.speed;

    points.position.x += (targetX - points.position.x) * 0.03;
    points.position.y += (targetY - points.position.y) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={config.color}
        size={config.size}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

function Scene({
  pointer,
  scrollY,
  frozen,
}: {
  pointer: RefObject<Pointer>;
  scrollY: RefObject<number>;
  frozen: boolean;
}) {
  return (
    <>
      {LAYERS.map((layer, i) => (
        <StarLayer key={i} config={layer} pointer={pointer} scrollY={scrollY} frozen={frozen} />
      ))}
    </>
  );
}

export function Starfield() {
  const { pointer, scrollY } = useWindowPointerAndScroll();
  const { frozen } = useMotion();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-space-void">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
        <Scene pointer={pointer} scrollY={scrollY} frozen={frozen} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-space-void/0 via-transparent to-space-void" />
    </div>
  );
}
