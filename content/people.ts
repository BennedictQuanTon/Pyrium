import type { Organizer, TeamMember, Testimonial } from "./types";

/**
 * Organizers, sponsors and platforms of events the team built at together. Logos are real
 * marks pulled from public sources (simple-icons CDN, Wikimedia Commons, vendor sites) and
 * normalized to one graphite fill in public/brand/logos; brands without a public mark render
 * as a plain wordmark in the same tone, which is the trademark-safe default anyway.
 */
export const organizers: Organizer[] = [
  { id: "nvidia", name: "NVIDIA", logo: "/brand/logos/nvidia.svg", viewBox: "0 0 24 24" },
  { id: "viettel", name: "Viettel", logo: "/brand/logos/viettel.svg", viewBox: "0 0 800 170" },
  { id: "sovico", name: "SOVICO", logo: "/brand/logos/sovico.png", viewBox: "0 0 187 116" },
  {
    id: "google",
    name: "Google",
    logo: "/brand/logos/google.svg",
    viewBox: "0 0 272 92",
  },
  { id: "openacc", name: "OpenACC" },
  { id: "assemblyai", name: "AssemblyAI" },
  { id: "lablab", name: "lablab.ai" },
  { id: "openai", name: "OpenAI", logo: "/brand/logos/openai.svg", viewBox: "0 0 1180 320" },
  { id: "devpost", name: "Devpost", logo: "/brand/logos/devpost.svg", viewBox: "0 0 24 24" },
  { id: "amd", name: "AMD", logo: "/brand/logos/amd.svg", viewBox: "0 0 24 24" },
  { id: "sea", name: "Sea / Shopee", logo: "/brand/logos/shopee.svg", viewBox: "0 0 24 24" },
  // Academic institutions the team studies and collaborates with.
  { id: "uts", name: "UTS", logo: "/brand/logos/uts.svg", viewBox: "0 0 406.32 406.32" },
  { id: "bku", name: "HCMUT (Bách Khoa)", logo: "/brand/logos/bku.png", viewBox: "0 0 240 240" },
];

export const team: TeamMember[] = [
  // Trio source reads right-to-left: Yoshio, Quan, Tuong.
  { name: "Yoshio Nomura", github: "UniverseScripts", role: null, photo: "/team/yoshio.png" },
  {
    name: "Long Quan (Bennedict) Ton",
    github: "BennedictQuanTon",
    role: null,
    photo: "/team/quan.png",
  },
  { name: "Huynh Khanh Tuong", github: "khanhtuongnakitomo", role: null, photo: "/team/tuong.png" },
];

/** No real quotes yet. These cards render with a visible "Placeholder" label. */
export const testimonials: Testimonial[] = [
  {
    placeholder: true,
    quote: "Quote from a collaborator goes here once they've approved it.",
    name: "Name pending",
    context: "Collaborator",
  },
  {
    placeholder: true,
    quote: "Quote from someone who used one of our projects goes here once approved.",
    name: "Name pending",
    context: "User",
  },
  {
    placeholder: true,
    quote: "Quote from a hackathon partner or mentor goes here once approved.",
    name: "Name pending",
    context: "Mentor",
  },
];
