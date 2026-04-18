import type { EcosystemProject } from "./types";

export const ECOSYSTEM_PROJECTS: EcosystemProject[] = [
  {
    id: "alpha",
    name: "Alpha Protocol",
    shortName: "Alpha",
    description: "Protocol Foundation - Enabling P2P Connections",
    url: "https://alphaprotocol.network",
    color: "#dc2626",
    colorVar: "--ss-alpha",
  },
  {
    id: "omega",
    name: "Omega Wireless",
    shortName: "Omega",
    description: "Hardware Foundation - Physical Access Points",
    url: "https://omegawireless.xyz",
    color: "#f97316",
    colorVar: "--ss-omega",
  },
  {
    id: "vibertas",
    name: "Vibertas",
    shortName: "Viber",
    description: "Sovereign OS - Your Interface to the Mesh",
    url: "https://vibertas.com",
    color: "#eab308",
    colorVar: "--ss-vibertas",
  },
  {
    id: "vibe",
    name: "VIBE Token",
    shortName: "VIBE",
    description: "Ecosystem Rewards - Value for Contributors",
    url: "https://vibetoken.xyz",
    color: "#22c55e",
    colorVar: "--ss-vibe",
  },
  {
    id: "vibeland",
    name: "VIBELAND",
    shortName: "VIBELAND",
    description: "The Sovereign Metaverse - Immersive 3D Worlds",
    url: "https://vibeland.com",
    color: "#3b82f6",
    colorVar: "--ss-vibeland",
  },
  {
    id: "pythia",
    name: "Pythia AI",
    shortName: "Pythia",
    description: "Emergent AI - Powered by the Ecosystem",
    url: "https://pythia-ai.xyz",
    color: "#6366f1",
    colorVar: "--ss-pythia",
  },
  {
    id: "spectrum",
    name: "Spectrum Galactic",
    shortName: "Spectrum",
    description: "Global Reach - Satellite Coverage Extension",
    url: "https://spectrumgalactic.xyz",
    color: "#8b5cf6",
    colorVar: "--ss-spectrum",
  },
];

export function getProject(id: string): EcosystemProject | undefined {
  return ECOSYSTEM_PROJECTS.find((p) => p.id === id);
}

export function getProjectColor(id: string): string {
  return getProject(id)?.color ?? "#6b7280";
}

export function getProjectsWithCurrent(currentId: string) {
  return ECOSYSTEM_PROJECTS.map((p) => ({
    ...p,
    isCurrent: p.id === currentId,
  }));
}
