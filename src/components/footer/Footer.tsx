"use client";

import { useEffect } from "react";

const SOCIALS = [
  { label: "YouTube", href: "https://youtube.com/@oriexflow", d: "M23 12s0-3.9-.5-5.6c-.3-1-1.1-1.8-2.1-2C18.7 4 12 4 12 4s-6.7 0-8.4.4c-1 .2-1.8 1-2.1 2C1 8.1 1 12 1 12s0 3.9.5 5.6c.3 1 1.1 1.8 2.1 2 1.7.4 8.4.4 8.4.4s6.7 0 8.4-.4c1-.2 1.8-1 2.1-2 .5-1.7.5-5.6.5-5.6zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" },
  { label: "Instagram", href: "https://instagram.com/oriexflow", d: "M12 2.2c3.2 0 3.6 0 4.8.1 3.2.1 4.7 1.7 4.8 4.8.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.7-4.8 4.8-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.2-.1-4.7-1.7-4.8-4.8C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.5 7.2 2.4 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.4 1.4 0 1 0 0-2.9 1.4 1.4 0 0 0 0 2.9z" },
  { label: "TikTok", href: "https://tiktok.com/@oriexflow", d: "M19.6 6.7a5.6 5.6 0 0 1-3.4-3.5h-3.5v13.6a3 3 0 1 1-2.9-3.9c.3 0 .6 0 .9.1V9.4a6.6 6.6 0 0 0-.9-.1 6.5 6.5 0 1 0 6.5 6.5V9.9a9 9 0 0 0 4.6 1.3V7.6c-.4 0-.9-.3-1.3-.9z" },
  { label: "X", href: "https://x.com/oriexflow", d: "M18.2 2h3.3l-7.2 8.3L22.8 22h-6.6l-5.2-6.8L5 22H1.7l7.7-8.8L1.2 2h6.8l4.7 6.2L18.2 2zm-1.2 18h1.8L7 3.9H5L17 20z" },
  { label: "LinkedIn", href: "https://linkedin.com/company/oriexflow", d: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.4 0h4.4v1.9h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.5 3.1 5.5 7.1V22h-4.6v-6.5c0-1.6 0-3.6-2.2-3.6s-2.6 1.7-2.6 3.5V22H7.6V8z" },
];

const QUICK = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  /* easter egg */
  useEffect(() => {
    console.log(
      `%c
   ██████  ██████  ██ ███████ ██   ██
  ██    ██ ██   ██ ██ ██       ██ ██
  ██    ██ ██████  ██ █████     ███
  ██    ██ ██   ██ ██ ██       ██ ██
   ██████  ██   ██ ██ ███████ ██   ██  FLOW
`,
      "color:#7c5cff; font-weight:bold;"
    );
    console.log(
      "%cYou read consoles. We cut film. Let's talk → hello@oriexflow.com",
      "color:#22d3ee; font-size:12px;"
    );
  }, []);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <p
          aria-hidden="true"
          className="font-display select-none bg-[image:var(--gradient-brand)] bg-clip-text text-center text-[16vw] font-bold leading-none tracking-tight text-transparent opacity-90 lg:text-[11rem]"
        >
          OriexFlow
        </p>

        <div className="mt-12 flex flex-col items-center justify-between gap-8 border-t border-line pt-10 sm:flex-row">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
              {QUICK.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`OriexFlow on ${s.label}`}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-muted transition-all hover:text-fg hover:[box-shadow:0_0_24px_-6px_rgba(124,92,255,0.8)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-center font-mono text-[11px] tracking-widest text-white/30">
          © 2026 ORIEXFLOW · CINEMATIC CONTENT, SHIPPED IN 48 HOURS
        </p>
      </div>
    </footer>
  );
}
