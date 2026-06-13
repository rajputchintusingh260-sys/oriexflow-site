export type Service = {
  id: string;
  title: string;
  valueProp: string;
  included: string[];
  price: string;
  /** which 3D icon the card renders */
  icon: "knot" | "cube" | "octa" | "rings";
};

export const services: Service[] = [
  {
    id: "short-form",
    title: "Short-form video",
    valueProp: "Reels, Shorts and TikToks engineered to stop the scroll.",
    included: [
      "Hook-first scripting support",
      "Captions, motion graphics, SFX",
      "Platform-native 9:16 exports",
      "Trend & format research",
    ],
    price: "From $450/mo",
    icon: "knot",
  },
  {
    id: "youtube",
    title: "YouTube long-form editing",
    valueProp: "Retention-driven edits that keep viewers to the end screen.",
    included: [
      "Story-structure pass on every cut",
      "Color grade + sound mix",
      "Thumbnails & title options",
      "Chapters, end screens, SEO assist",
    ],
    price: "From $300/video",
    icon: "cube",
  },
  {
    id: "brand-films",
    title: "Brand films & ads",
    valueProp: "Launch films and ad creative built to convert, not just impress.",
    included: [
      "Concept & storyboard",
      "Cinematic grade + licensed music",
      "Cutdowns for every placement",
      "Two rounds of strategy review",
    ],
    price: "From $1,200/project",
    icon: "octa",
  },
  {
    id: "systems",
    title: "Content systems & strategy",
    valueProp: "One recording day becomes a month of publish-ready content.",
    included: [
      "Content pillar & calendar design",
      "Repurposing pipeline setup",
      "Analytics review every month",
      "Async Slack-style collaboration",
    ],
    price: "From $900/mo",
    icon: "rings",
  },
];
