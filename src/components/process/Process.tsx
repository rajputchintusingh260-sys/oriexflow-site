"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "A focused kickoff call plus a full audit of your brand, channels and current content. We leave with your voice, your goals, and a shared definition of what 'great' looks like.",
    shape: "M20 80 L50 20 L80 80 Z", // triangle
  },
  {
    n: "02",
    title: "Plan",
    body: "Content strategy, hooks, and a shot list mapped to your calendar. You always know what's being made, why, and exactly when it lands.",
    shape: "M25 25 H75 V75 H25 Z", // square
  },
  {
    n: "03",
    title: "Create",
    body: "Edit, color, motion graphics and sound design — the cinematic layer. Every cut gets a retention pass before it ever reaches your review link.",
    shape: "M50 15 L85 50 L50 85 L15 50 Z", // diamond
  },
  {
    n: "04",
    title: "Deliver",
    body: "48-hour average turnaround, platform-ready exports, and unlimited revisions for 7 days. Post it, measure it, and we feed the data back into step one.",
    shape: "M50 15 A35 35 0 1 1 49.9 15", // circle
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const scrollWidth = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -scrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative scroll-mt-24 overflow-hidden py-28 lg:py-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 lg:pt-28">
        <Reveal>
          <p className="font-mono mb-4 text-xs tracking-[0.25em] text-cyan">[ PROCESS ]</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Four steps. <span className="text-gradient">Zero</span> chaos.
          </h2>
        </Reveal>
      </div>

      {/* horizontal track — pinned + scrubbed on desktop, stacked on mobile */}
      <div
        ref={trackRef}
        className="mt-14 flex flex-col gap-6 px-6 lg:h-[60vh] lg:flex-row lg:items-center lg:gap-10 lg:px-[8vw] lg:pb-28"
      >
        {STEPS.map((s) => (
          <article
            key={s.n}
            className="glass relative flex shrink-0 flex-col justify-between rounded-3xl p-8 lg:h-[26rem] lg:w-[34rem] lg:p-12"
          >
            <svg
              className="absolute right-8 top-8 h-16 w-16 text-violet/60 lg:h-24 lg:w-24"
              viewBox="0 0 100 100" fill="none" aria-hidden="true"
            >
              <path d={s.shape} stroke="url(#pg)" strokeWidth="1.5" />
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="100" y2="100">
                  <stop stopColor="#7c5cff" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <p className="font-display text-7xl font-bold text-white/10 lg:text-9xl">{s.n}</p>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight lg:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
