"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

const PROJECT_TYPES = ["Short-form video", "YouTube editing", "Brand film / ad", "Content system", "Something else"];
const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"];

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-fg placeholder:text-white/30 transition-colors focus:border-cyan/60 focus:outline-none";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* Wire to your form backend (Formspree / Resend / API route).
       For now: open a pre-filled mail draft so no lead is ever lost. */
    const data = new FormData(e.currentTarget);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nProject: ${data.get("projectType")}\nBudget: ${data.get("budget")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:hello@oriexflow.com?subject=Project inquiry — ${data.get("name")}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-32">
      <div className="glow left-1/2 top-1/2 h-[30rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 bg-violet/15" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center">
          <p className="font-mono mb-6 inline-block text-xs tracking-[0.3em] text-cyan">
            <span className="timecode" aria-hidden="true">REC · LET&apos;S ROLL</span>
          </p>
          <h2 className="font-display mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Let&apos;s make something <span className="text-gradient">cinematic</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted">
            Tell us about the project. We reply within one business day with a scoped plan and a call link.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            className="glass mx-auto mt-14 max-w-2xl space-y-5 rounded-3xl p-7 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-mono mb-2 block text-[10px] tracking-[0.2em] text-muted">NAME</label>
                <input id="name" name="name" required placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="email" className="font-mono mb-2 block text-[10px] tracking-[0.2em] text-muted">EMAIL</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputCls} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="projectType" className="font-mono mb-2 block text-[10px] tracking-[0.2em] text-muted">PROJECT TYPE</label>
                <select id="projectType" name="projectType" className={inputCls} defaultValue={PROJECT_TYPES[0]}>
                  {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="font-mono mb-2 block text-[10px] tracking-[0.2em] text-muted">BUDGET</label>
                <select id="budget" name="budget" className={inputCls} defaultValue={BUDGETS[1]}>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="font-mono mb-2 block text-[10px] tracking-[0.2em] text-muted">MESSAGE</label>
              <textarea
                id="message" name="message" required rows={5}
                placeholder="What are we making, and when do you need it?"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
              <MagneticButton type="submit" ariaLabel="Send project inquiry" className="w-full sm:w-auto">
                Send inquiry
              </MagneticButton>
              <a href="mailto:hello@oriexflow.com" className="text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline">
                or email hello@oriexflow.com
              </a>
            </div>

            {sent && (
              <p role="status" className="text-center text-sm text-cyan">
                Draft opened in your mail app — hit send and we&apos;re on it.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
