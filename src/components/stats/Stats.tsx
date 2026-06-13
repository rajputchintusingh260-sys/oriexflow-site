"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const STATS = [
  { value: 200, suffix: "+", label: "videos shipped" },
  { value: 50, suffix: "M+", label: "views generated" },
  { value: 48, suffix: "hr", label: "avg delivery" },
  { value: 4.9, suffix: "★", label: "avg rating", decimals: 1 },
];

const LOGOS = ["Northbeam", "Atlas", "Lumen", "Vance", "Margin Pod", "Prism"];

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.8, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = value.toFixed(decimals) + suffix;
      return;
    }
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
    });
  }, [spring, suffix, decimals, reduce, value]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/40 py-20">
      <div className="spotlight" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <p className="font-kinetic text-5xl font-bold tracking-tight sm:text-6xl">
                <span className="text-gradient">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </span>
              </p>
              <p className="font-mono mt-3 text-[10px] tracking-[0.25em] text-muted">
                {s.label.toUpperCase()}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="font-mono mt-16 mb-6 text-center text-[10px] tracking-[0.3em] text-cyan/70">
            [ TRUSTED BY OPERATORS &amp; CREATORS ]
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {LOGOS.map((l) => (
              <li
                key={l}
                className="font-display text-xl font-semibold text-white/25 grayscale transition-all duration-300 hover:text-gradient hover:grayscale-0"
              >
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
