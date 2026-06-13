"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const TOOLS = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D", "Blender"];

export default function About() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !photoRef.current) return;
    const tween = gsap.fromTo(
      photoRef.current,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: photoRef.current, scrub: 1, start: "top bottom", end: "bottom top" },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section id="about" className="scroll-mt-24 border-y border-line bg-surface/40 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        {/* founder visual with parallax */}
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface">
            <div ref={photoRef} className="absolute inset-[-10%]">
              {/* Replace with founder photo: drop founder.jpg in public/ and use next/image */}
              <div className="h-full w-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,92,255,0.35),transparent_55%),radial-gradient(ellipse_at_75%_80%,rgba(34,211,238,0.25),transparent_55%)]" />
              <p className="font-display absolute inset-0 flex items-center justify-center text-8xl font-bold text-white/5">
                OF
              </p>
            </div>
            <span className="font-mono absolute bottom-5 left-5 rounded-full border border-line bg-bg/70 px-3 py-1.5 text-[10px] tracking-[0.2em] backdrop-blur">
              FOUNDER / LEAD EDITOR
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-mono mb-4 text-xs tracking-[0.25em] text-cyan">[ ABOUT ]</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Why OriexFlow <span className="text-gradient">exists</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 leading-relaxed text-muted">
              OriexFlow started in a one-room edit suite with a simple frustration: founders and creators
              were sitting on incredible stories, but everything between the idea and the published video —
              editing, pacing, sound, strategy — was eating the time they should have spent building. We
              decided to own that entire middle layer.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              Today we run content systems for SaaS founders, coaches and creators across three continents,
              with one rule that hasn&apos;t changed since day one: every frame has to earn its place. Cinematic
              isn&apos;t a filter we apply at the end — it&apos;s how we think from the first cut.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-mono mt-10 text-[10px] tracking-[0.2em] text-white/40">TOOLS WE LIVE IN</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {TOOLS.map((t) => (
                <li key={t} className="glass rounded-full px-4 py-2 text-sm text-fg/80">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
