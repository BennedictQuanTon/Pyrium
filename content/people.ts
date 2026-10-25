import type { Organizer, Quote, TeamMember } from "./types";

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
  {
    name: "Yoshio Nomura",
    github: "UniverseScripts",
    role: "Co-founder",
    study: "Bachelor of AI · UTS × HCMUT",
    photo: "/team/yoshio.png",
  },
  {
    name: "Long Quan (Bennedict) Ton",
    github: "BennedictQuanTon",
    role: "Co-founder",
    study: "Bachelor of AI · UTS × HCMUT",
    photo: "/team/quan.png",
  },
  {
    name: "Huynh Khanh Tuong",
    github: "khanhtuongnakitomo",
    role: "Co-founder",
    study: "Bachelor of IT · UTS × HCMUT",
    photo: "/team/tuong.png",
  },
];

/**
 * Draft testimonials, written by the team for a real person in each role to approve or
 * rewrite. They carry a role, never an invented name; set `draft: false` and add `name` once
 * the person signs off on the exact wording.
 */
export const testimonials: Quote[] = [
  {
    draft: true,
    quote:
      "Most teams showed a chatbot. Pyrium showed a decision with the evidence attached — and a rule engine that refused to let the model guess.",
    role: "Mentor · Vietnam AI Open Hackathon",
  },
  {
    draft: true,
    quote:
      "It took a full table’s order in two languages and never added a dish we don’t serve. My staff trusted it by the second service.",
    role: "Restaurant manager · The Lantern trial",
  },
  {
    draft: true,
    quote:
      "They measure before they claim. Every number in the demo came with the test set it was measured on.",
    role: "Research advisor · AITechLab, HCMUT",
  },
  {
    draft: true,
    quote:
      "I could tell which figure came from our records, which from the manual and which from the model. That separation is the product.",
    role: "Maintenance engineer · IGNIS reviewer",
  },
  {
    draft: true,
    quote:
      "Unfound treats the admin as the threat model, not an afterthought. Quorum approval for every grant is exactly right.",
    role: "Judge · RMIT GenAI & Cybersecurity Hackathon",
  },
  {
    draft: true,
    quote:
      "Instead of a wind speed, I got a go or no-go for the boat tour and the reasons behind it. That’s what I actually needed.",
    role: "Beta tester · Weatherise",
  },
];
