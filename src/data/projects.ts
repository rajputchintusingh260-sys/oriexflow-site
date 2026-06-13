export type VideoSource =
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "file"; src: string }; // place files in public/videos/

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Short-form" | "YouTube" | "Brand film" | "Podcast";
  video: VideoSource;
  /** Optional custom thumbnail (public/ path or remote URL). YouTube
   *  projects fall back to the YT thumbnail automatically. */
  thumbnail?: string;
  /** Bento grid: cards with `wide: true` span 2 columns on desktop. */
  wide?: boolean;
};

/* ──────────────────────────────────────────────────────────────
   PORTFOLIO — edit this array and the Work grid updates itself.
   Placeholder entries below use royalty-free / demo YouTube IDs.
   ────────────────────────────────────────────────────────────── */
export const projects: Project[] = [
  {
    slug: "summit-launch-film",
    title: "Summit Launch Film",
    client: "Northbeam SaaS",
    category: "Brand film",
    video: { type: "youtube", id: "aqz-KE-bpKQ" }, // Big Buck Bunny (CC)
    wide: true,
  },
  {
    slug: "founder-story-reel",
    title: "Founder Story Reel",
    client: "Atlas Coaching",
    category: "Short-form",
    video: { type: "youtube", id: "LXb3EKWsInQ" }, // 4K nature demo (CC)
  },
  {
    slug: "weekly-podcast-cutdowns",
    title: "Weekly Podcast Cutdowns",
    client: "The Margin Pod",
    category: "Podcast",
    video: { type: "youtube", id: "eRsGyueVLvQ" },
  },
  {
    slug: "product-deep-dive",
    title: "Product Deep Dive",
    client: "Lumen Analytics",
    category: "YouTube",
    video: { type: "youtube", id: "EngW7tLk6R8" },
  },
  {
    slug: "city-listing-tour",
    title: "Cinematic Listing Tour",
    client: "Vance Realty",
    category: "Brand film",
    video: { type: "youtube", id: "1La4QzGeaaQ" },
  },
  {
    slug: "creator-shorts-system",
    title: "Creator Shorts System",
    client: "Mira Patel",
    category: "Short-form",
    video: { type: "youtube", id: "ScMzIvxBSi4" },
    wide: true,
  },
];
