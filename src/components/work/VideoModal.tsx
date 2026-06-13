"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { EASE } from "@/lib/motion";

/** Full-screen video modal. Traps focus, closes on Esc / backdrop click. */
export default function VideoModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // simple focus trap
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], iframe, video, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const { video } = project;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — video player`}
    >
      <motion.div
        ref={dialogRef}
        className="relative w-full max-w-5xl"
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 12 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-display text-lg font-semibold">{project.title}</p>
            <p className="font-mono text-xs tracking-widest text-muted">
              {project.client.toUpperCase()} · {project.category.toUpperCase()}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="gradient-border aspect-video overflow-hidden rounded-2xl bg-surface [&::before]:!opacity-100">
          {video.type === "youtube" && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
              title={project.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          )}
          {video.type === "vimeo" && (
            <iframe
              src={`https://player.vimeo.com/video/${video.id}?autoplay=1`}
              title={project.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          )}
          {video.type === "file" && (
            <video src={video.src} controls autoPlay playsInline className="h-full w-full" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
