"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faq } from "@/data/faq";
import Reveal from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

function Item({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-${id}`}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className={`font-display text-lg font-semibold tracking-tight transition-colors sm:text-xl ${open ? "text-gradient" : ""}`}>
            {q}
          </span>
          <span
            aria-hidden="true"
            className={`glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-400 ${open ? "rotate-45" : ""}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-28 lg:px-10">
      <Reveal className="text-center">
        <p className="font-mono mb-4 text-xs tracking-[0.25em] text-cyan">[ FAQ ]</p>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
          Asked &amp; <span className="text-gradient">answered</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 border-t border-line">
        {faq.map((item, i) => (
          <Item
            key={item.q}
            id={String(i)}
            q={item.q}
            a={item.a}
            open={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
          />
        ))}
      </Reveal>
    </section>
  );
}
