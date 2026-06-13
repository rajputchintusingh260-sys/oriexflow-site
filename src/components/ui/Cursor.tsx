"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * 3D custom cursor: 3 layered elements with depth, perspective tilt driven by
 * velocity, and a glowing core. Scales over interactive elements and shows a
 * contextual label from `data-cursor="VIEW" | "PLAY"`. Pointer-fine only;
 * native cursor returns on inputs.
 */
export default function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    document.body.classList.add("cursor-active");
    const core = coreRef.current!;
    const ring = ringRef.current!;
    const halo = haloRef.current!;
    const label = labelRef.current!;

    /* Different lag per layer = parallax depth effect */
    const coreX = gsap.quickTo(core, "x", { duration: 0.08, ease: "power3" });
    const coreY = gsap.quickTo(core, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3" });
    const haloX = gsap.quickTo(halo, "x", { duration: 0.55, ease: "power3" });
    const haloY = gsap.quickTo(halo, "y", { duration: 0.55, ease: "power3" });

    /* velocity-driven 3D tilt + squash */
    const ringRX = gsap.quickTo(ring, "rotationX", { duration: 0.4, ease: "power3" });
    const ringRY = gsap.quickTo(ring, "rotationY", { duration: 0.4, ease: "power3" });
    const ringSX = gsap.quickTo(ring, "scaleX", { duration: 0.25, ease: "power3" });
    const ringSY = gsap.quickTo(ring, "scaleY", { duration: 0.25, ease: "power3" });

    let lastX = 0, lastY = 0, lastT = performance.now();

    const move = (e: MouseEvent) => {
      coreX(e.clientX); coreY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
      haloX(e.clientX); haloY(e.clientY);

      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      const vx = (e.clientX - lastX) / dt;
      const vy = (e.clientY - lastY) / dt;
      const speed = Math.hypot(vx, vy);
      const cap = Math.min(speed, 3);

      ringRY(vx * 8);
      ringRX(-vy * 8);
      ringSX(1 + cap * 0.06);
      ringSY(1 - cap * 0.04);

      lastX = e.clientX; lastY = e.clientY; lastT = now;
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      const text = t?.dataset.cursor ?? "";
      label.textContent = text;
      gsap.to(ring, {
        scale: text ? 3.2 : t ? 1.9 : 1,
        backgroundColor: text ? "rgba(225,29,72,0.95)" : "transparent",
        borderColor: text ? "rgba(225,29,72,1)" : "rgba(255,255,255,0.4)",
        duration: 0.3,
      });
      gsap.to(halo, {
        scale: text ? 2.4 : t ? 1.6 : 1,
        opacity: text ? 0.55 : t ? 0.35 : 0.2,
        duration: 0.35,
      });
      gsap.to(core, { opacity: text ? 0 : 1, duration: 0.2 });
    };

    const down = () => gsap.to([ring, halo], { scale: "-=0.25", duration: 0.15, overwrite: "auto" });
    const up   = () => gsap.to([ring, halo], { scale: "+=0.25", duration: 0.25, overwrite: "auto" });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.body.classList.remove("cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] hidden [perspective:600px] [@media(pointer:fine)]:block"
    >
      {/* outer halo — slowest, big glow */}
      <div
        ref={haloRef}
        className="absolute -ml-12 -mt-12 h-24 w-24 rounded-full opacity-20 [will-change:transform]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.7) 0%, rgba(34,211,238,0.3) 40%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
      {/* mid ring with 3D tilt */}
      <div
        ref={ringRef}
        className="absolute -ml-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 [transform-style:preserve-3d] [will-change:transform]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 70%)",
          boxShadow:
            "0 0 18px rgba(124,92,255,0.35), inset 0 0 8px rgba(34,211,238,0.25)",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono select-none text-[7px] font-bold tracking-widest text-white drop-shadow"
        />
      </div>
      {/* inner core — fastest, bright */}
      <div
        ref={coreRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-white [will-change:transform]"
        style={{ boxShadow: "0 0 10px rgba(255,255,255,0.9), 0 0 24px rgba(124,92,255,0.7)" }}
      />
    </div>
  );
}
