"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import Tilt3D from "@/components/ui/Tilt3D";
import VideoModal from "./VideoModal";

function thumbFor(p: Project): string {
  if (p.thumbnail) return p.thumbnail;
  if (p.video.type === "youtube")
    return `https://img.youtube.com/vi/${p.video.id}/hqdefault.jpg`;
  return "/videos/poster-fallback.jpg";
}

function Card({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="PLAY"
      aria-label={`Play ${project.title} for ${project.client}`}
      className={`gradient-border group relative block overflow-hidden rounded-2xl border border-line bg-surface text-left ${
        project.wide ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbFor(project)}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
        {/* play affordance */}
        <span className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <svg width="12" height="12" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
            <path d="M0 0l12 7-12 7V0z" />
          </svg>
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">{project.client}</p>
        </div>
        <span className="font-mono shrink-0 rounded-full border border-line px-3 py-1 text-[10px] tracking-widest text-cyan">
          {project.category.toUpperCase()}
        </span>
      </div>
    </button>
  );
}

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10">
      <Reveal>
        <p className="font-mono mb-4 text-xs tracking-[0.25em] text-cyan">[ SELECTED WORK ]</p>
        <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Work that earns the <span className="text-gradient">rewatch</span>.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05} className={p.wide ? "md:col-span-2" : ""}>
            <Tilt3D max={8} glare={0.14}>
              <Card project={p} onOpen={() => setActive(p)} />
            </Tilt3D>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && <VideoModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
