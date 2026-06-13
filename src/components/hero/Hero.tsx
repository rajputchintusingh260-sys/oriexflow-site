"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import Marquee from "@/components/ui/Marquee";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Scene3D = lazy(() => import("./Scene3D"));

const HEADLINE = "We turn ideas into cinematic content.";
const CLIENTS = [
  "Northbeam", "Atlas Coaching", "Lumen Analytics", "Vance Realty",
  "The Margin Pod", "Closers Cult", "Prism Wealth", "Groove Cruise",
];

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [sceneVisible, setSceneVisible] = useState(false);

  /* lazy-mount the 3D scene only when the hero is on screen,
     and skip it entirely under prefers-reduced-motion */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => setSceneVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* character-split stagger reveal on the headline */
  useEffect(() => {
    const el = headlineRef.current;
    if (!el || prefersReducedMotion()) return;
    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    const tween = gsap.fromTo(
      chars,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.022,
        duration: 0.9,
        ease: "expo.out",
        delay: 1.7, // after the preloader exits
      }
    );
    return () => { tween.kill(); };
  }, []);

  /* mouse parallax-drift on the background kinetic tagline */
  useEffect(() => {
    const el = taglineRef.current;
    if (!el || prefersReducedMotion()) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(el, { x, y, duration: 1.2, ease: "expo.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* scroll-driven 3D depth parallax — layers translate at different rates,
     kinetic backdrop pushes back in Z, headline floats forward */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    const tagline = taglineRef.current;
    const headline = headlineRef.current;
    if (!section || !tagline || !headline) return;

    const ctx = gsap.context(() => {
      gsap.to(tagline, {
        y: -120,
        scale: 1.35,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(headline, {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28"
    >
      {/* cinema spotlight + glows */}
      <div className="spotlight" />
      <div className="glow left-[-10%] top-[10%] h-[28rem] w-[28rem] bg-violet/25" />
      <div className="glow right-[-12%] bottom-[15%] h-[24rem] w-[24rem] bg-cyan/15" />

      {/* 3D background */}
      <div className="absolute inset-0 opacity-80" aria-hidden="true">
        {sceneVisible && (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        )}
      </div>

      {/* kinetic background tagline — parallax drift */}
      <div
        ref={taglineRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
      >
        <span className="font-kinetic select-none whitespace-nowrap text-[18vw] font-bold leading-none text-white/[0.025] sm:text-[14vw]">
          ORIEX&nbsp;·&nbsp;FLOW
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-start justify-center px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="timecode" aria-hidden="true">REC · 00:00:48</span>
          <p className="font-mono text-xs tracking-[0.25em] text-cyan">
            [ VIDEO &amp; CONTENT STUDIO ]
          </p>
        </div>

        <h1
          ref={headlineRef}
          className="font-display max-w-5xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
          aria-label={HEADLINE}
        >
          {HEADLINE.split(" ").map((word, wi) => (
            <span key={wi} className="mr-[0.24em] inline-block overflow-hidden align-bottom" aria-hidden="true">
              {word.split("").map((ch, ci) => (
                <span
                  key={ci}
                  data-char
                  className={`inline-block will-change-transform ${
                    word === "cinematic" ? "text-gradient" : ""
                  }`}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="mt-7 max-w-xl text-lg text-muted">
          Premium short-form, YouTube edits, and brand films — delivered in 48 hours.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#work" className="btn-fire" data-cursor="PLAY" aria-label="See our work">
            <svg width="14" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
              <path d="M0 0l12 7-12 7V0z" />
            </svg>
            Watch reel
          </a>
          <MagneticButton href="#contact" variant="ghost" ariaLabel="Book a call">
            Book a call
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MagneticButton>
        </div>

        {/* meta-row: small proofs under CTAs */}
        <ul className="font-mono mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-[10px] tracking-[0.22em] text-white/40">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> 48-HR AVG DELIVERY
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet" /> 200+ VIDEOS SHIPPED
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" /> 50M+ VIEWS GENERATED
          </li>
        </ul>
      </div>

      {/* client logo marquee */}
      <div className="relative z-10 border-t border-line py-7">
        <Marquee>
          {CLIENTS.map((c) => (
            <span key={c} className="font-display whitespace-nowrap text-lg font-semibold text-white/30 transition-colors hover:text-white/70">
              {c}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
