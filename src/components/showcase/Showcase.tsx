"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import Tilt3D from "@/components/ui/Tilt3D";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* Cinematic showcase — three kinetic rows that scroll at different speeds
   as the section enters the viewport. Builds a film-strip / kinetic-poster
   feel without needing actual video assets. */

const ROWS = [
  {
    cls: "text-fire",
    items: ["SHORT-FORM", "VIRAL HOOKS", "RETENTION CUTS", "CINEMATIC GRADE"],
    dir: 1,
  },
  {
    cls: "text-white/15",
    items: ["YOUTUBE LONG-FORM", "BRAND FILMS", "PODCAST CLIPS", "MOTION DESIGN"],
    dir: -1,
  },
  {
    cls: "text-gradient",
    items: ["48-HOUR DELIVERY", "UNLIMITED REVISIONS", "STRATEGY FIRST", "BUILT FOR ALGOS"],
    dir: 1,
  },
];

const FRAMES = [
  {
    label: "REEL.01",
    title: "Hook in 1.4s",
    body: "Pattern-interrupt openers tuned to the algorithm — average watch-through up 38%.",
    color: "from-violet/30 to-transparent",
  },
  {
    label: "REEL.02",
    title: "Cinema-grade color",
    body: "DaVinci-graded looks across LUTs and skin tones. Your channel finally has a signature.",
    color: "from-cyan/25 to-transparent",
  },
  {
    label: "REEL.03",
    title: "Sound that hits",
    body: "Designed beds, SFX layers, and dialog cleanup. Pro audio without the post-house bill.",
    color: "from-crimson/25 to-transparent",
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const dir = ROWS[i].dir;
        gsap.fromTo(
          row,
          { xPercent: dir * -8 },
          {
            xPercent: dir * 8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="vignette relative isolate overflow-hidden border-y border-line bg-surface/30 py-28"
    >
      <div className="spotlight" />

      {/* kinetic rows */}
      <div className="space-y-3 sm:space-y-5">
        {ROWS.map((row, i) => (
          <div
            key={i}
            ref={(el) => { if (el) rowRefs.current[i] = el; }}
            className="font-kinetic flex shrink-0 select-none whitespace-nowrap text-[12vw] font-bold leading-none sm:text-[8vw] lg:text-[7vw]"
          >
            {[...row.items, ...row.items, ...row.items].map((it, idx) => (
              <span key={idx} className={`mx-8 ${row.cls}`}>
                {it} <span className="text-white/10">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* three featured frames */}
      <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono mb-3 text-xs tracking-[0.25em] text-cyan">[ THE STUDIO LAYER ]</p>
              <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                Built like a <span className="text-gradient">post house</span>.<br />
                Priced like an in-house team.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Three layers run on every project. Tuned for retention, brand fit, and audio that
              actually translates on a phone speaker.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FRAMES.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <Tilt3D max={12} glare={0.22}>
                <article className="gradient-border scanlines glass relative h-full overflow-hidden rounded-2xl p-7">
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${f.color}`} />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-cyan/80">{f.label}</span>
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" aria-hidden="true" />
                    </div>
                    <h3 className="font-display mt-12 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
                  </div>
                  {/* corner film-perforations */}
                  <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex justify-between">
                    {Array.from({ length: 10 }).map((_, k) => (
                      <span key={k} className="h-1.5 w-1.5 rounded-full bg-white/8" />
                    ))}
                  </div>
                </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
