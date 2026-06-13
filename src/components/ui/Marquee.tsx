import type { ReactNode } from "react";

/** Infinite horizontal marquee. Content is duplicated for a seamless loop. */
export default function Marquee({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${className}`}
    >
      <div className="flex w-max shrink-0 animate-marquee items-center gap-16 pr-16 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {children}
        <span aria-hidden="true" className="flex items-center gap-16">
          {children}
        </span>
      </div>
    </div>
  );
}
