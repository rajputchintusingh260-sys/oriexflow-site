"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="glow right-[5%] top-[20%] h-80 w-80 bg-cyan/10" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="font-mono mb-4 text-xs tracking-[0.25em] text-cyan">[ TESTIMONIALS ]</p>
          <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Don&apos;t take our <span className="text-gradient">word</span> for it.
          </h2>
        </Reveal>

        {/* 3-up on desktop, draggable carousel on mobile */}
        <motion.div
          className="mt-14 flex cursor-grab gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing md:grid md:grid-cols-3 md:overflow-visible [&::-webkit-scrollbar]:hidden"
          drag={false}
        >
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="min-w-[85%] snap-center sm:min-w-[60%] md:min-w-0">
              <figure className="gradient-border glass flex h-full flex-col justify-between rounded-2xl p-7">
                <div>
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true" className="text-violet">
                    <path d="M0 22V11.6C0 4.9 3.8 1 11 0l1.4 3.6C8.1 4.6 6 6.7 5.8 10H12v12H0zm16 0V11.6C16 4.9 19.8 1 27 0l1 3.6c-4.4 1-6.5 3.1-6.7 6.4H28v12H16z" fill="currentColor" opacity="0.6"/>
                  </svg>
                  <blockquote className="mt-5 leading-relaxed text-fg/85">{t.quote}</blockquote>
                </div>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-5">
                  <span
                    aria-hidden="true"
                    className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-bold text-white"
                  >
                    {t.initials}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}, {t.company}</p>
                  </div>
                  {t.videoUrl && (
                    <a
                      href={t.videoUrl}
                      data-cursor="PLAY"
                      aria-label={`Watch ${t.name}'s video testimonial`}
                      className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                    >
                      <svg width="11" height="12" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
                        <path d="M0 0l12 7-12 7V0z" />
                      </svg>
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
