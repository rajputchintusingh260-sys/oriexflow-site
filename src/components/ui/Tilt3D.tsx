"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Max tilt angle in degrees. Default 10. */
  max?: number;
  /** Glare/shine overlay opacity at max tilt. Default 0.18. */
  glare?: number;
  /** Perspective in px. Lower = more pronounced 3D. Default 800. */
  perspective?: number;
  /** Scale on hover. Default 1.02. */
  scale?: number;
  className?: string;
};

/**
 * Mouse-driven 3D parallax tilt. Wraps children with a perspective container
 * and pivots them on rotateX/rotateY based on cursor position. Adds a soft
 * specular glare that follows the pointer. GPU-accelerated, no rerenders.
 * Disabled under prefers-reduced-motion and on coarse-pointer devices.
 */
export default function Tilt3D({
  children,
  max = 10,
  glare = 0.18,
  perspective = 800,
  scale = 1.02,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    const glareEl = glareRef.current;
    if (!wrap || !inner || !glareEl) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rotX = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3" });
    const rotY = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3" });
    const sc   = gsap.quickTo(inner, "scale", { duration: 0.45, ease: "power3" });
    const gx   = gsap.quickTo(glareEl, "x", { duration: 0.35, ease: "power3" });
    const gy   = gsap.quickTo(glareEl, "y", { duration: 0.35, ease: "power3" });
    const go   = gsap.quickTo(glareEl, "opacity", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;   // 0..1
      const ny = (e.clientY - r.top) / r.height;   // 0..1
      const dx = nx - 0.5;
      const dy = ny - 0.5;
      rotY(dx * max * 2);
      rotX(-dy * max * 2);
      sc(scale);
      gx(nx * r.width);
      gy(ny * r.height);
      go(glare);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
      sc(1);
      go(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [max, glare, scale]);

  return (
    <div
      ref={wrapRef}
      className={`relative h-full [transform-style:preserve-3d] ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      <div
        ref={innerRef}
        className="relative h-full [transform-style:preserve-3d] [will-change:transform]"
      >
        {children}
        {/* specular glare overlay */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute -ml-40 -mt-40 h-80 w-80 rounded-full opacity-0 [will-change:transform,opacity]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}
