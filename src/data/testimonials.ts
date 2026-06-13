export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  videoUrl?: string; // optional video testimonial
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "OriexFlow took our raw founder rants and turned them into a content engine. We went from 2k to 90k followers in five months without touching an editing timeline once.",
    name: "Daniel Reyes",
    role: "Co-founder",
    company: "Northbeam SaaS",
    initials: "DR",
  },
  {
    quote:
      "The 48-hour turnaround isn't marketing copy — it's real. I send footage Monday night, I'm posting a polished reel Wednesday. The pacing and sound design are on another level.",
    name: "Mira Patel",
    role: "Creator",
    company: "270k on Instagram",
    initials: "MP",
  },
  {
    quote:
      "Every agency promises 'cinematic.' OriexFlow is the first one whose edits actually made our sales team's phones ring. Our launch film did 1.2M views organically.",
    name: "Sofia Lindqvist",
    role: "Head of Marketing",
    company: "Lumen Analytics",
    initials: "SL",
  },
];
