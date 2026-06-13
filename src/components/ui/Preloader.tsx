"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

const WORD = "ORIEXFLOW";

/** Full-screen loader: wordmark types out, gradient bar fills, clip-path exit. */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [chars, setChars] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const typing = setInterval(() => {
      setChars((c) => {
        if (c >= WORD.length) {
          clearInterval(typing);
          return c;
        }
        return c + 1;
      });
    }, 70);
    const exit = setTimeout(() => setDone(true), WORD.length * 70 + 900);
    return () => {
      clearInterval(typing);
      clearTimeout(exit);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-bg"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-hidden="true"
        >
          <p className="font-display text-3xl font-bold tracking-[0.3em] text-fg sm:text-5xl">
            {WORD.slice(0, chars)}
            <span className="animate-pulse text-cyan">_</span>
          </p>
          <div className="mt-8 h-px w-48 overflow-hidden rounded bg-white/10 sm:w-64">
            <motion.div
              className="h-full bg-[image:var(--gradient-brand)]"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: (WORD.length * 70 + 700) / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
