"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import Reveal from "@/components/ui/Reveal";
import Tilt3D from "@/components/ui/Tilt3D";

const ServiceIcon = dynamic(() => import("./ServiceIcon"), { ssr: false });

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 border-y border-line bg-surface/40 py-28">
      <div className="glow left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 bg-violet/10" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="font-mono mb-4 text-xs tracking-[0.25em] text-cyan">[ SERVICES ]</p>
          <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            One studio. Every format that <span className="text-gradient">grows</span> you.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className="h-full">
              <Tilt3D max={9} glare={0.16} className="h-full">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-border glass flex h-full flex-col rounded-2xl p-6"
                >
                  <ServiceIcon icon={s.icon} />
                  <h3 className="font-display mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.valueProp}</p>

                  <p className="font-mono mt-6 text-[10px] tracking-[0.2em] text-white/40">WHAT&apos;S INCLUDED</p>
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {s.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-fg/80">
                        <svg className="mt-1 shrink-0 text-cyan" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6.5L4.8 9.5L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 border-t border-line pt-4 font-medium">
                    <span className="text-gradient">{s.price}</span>
                  </p>
                </motion.article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
