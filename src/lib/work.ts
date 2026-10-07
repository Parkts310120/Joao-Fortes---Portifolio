export const evidenceStates = [
  "SANITIZED_CASE",
  "VERIFIED_PUBLIC_MAIN_TESTS_CI",
  "VERIFIED_PUBLIC_MAIN_BOUNDED_RUNTIME_TESTS_CI",
  "PUBLIC_PROOF_PENDING",
  "RESEARCH",
  "IN_BUILD",
] as const;

export type EvidenceState = (typeof evidenceStates)[number];

export type WorkCta = {
  label: string;
  href: string;
  kind: "internal" | "external";
};

export type WorkItem = {
  slug: string;
  title: string;
  state: EvidenceState;
  publicLabel: string;
  problem: string;
  summary: string;
  contribution: string;
  themes: readonly [string, string, ...string[]];
  proofCue: string;
  primaryRank: 1 | 2 | 3 | null;
  secondaryRank: 1 | 2 | 3 | null;
  routeEnabled: boolean;
  primaryCta?: WorkCta;
  secondaryCta?: WorkCta;
};

const work = [
  {
    slug: "transactional-operations-platform",
    title: "Transactional Operations Platform",
    state: "SANITIZED_CASE",
    publicLabel: "SANITIZED CASE",
    problem: "What should happen when order, inventory, payment or delivery fails at a different moment?",
    summary: "A sanitized case about truthful intermediate states, atomic inventory reservation, idempotent retries, server-side authorization and payment reconciliation.",
    contribution: "System design and implementation work around truthful state, authorization, retries and reconciliation; original source remains private.",
    themes: ["STATE MODELING", "RELIABILITY", "AUTHORIZATION"],
    proofCue: "SANITIZED ARCHITECTURE + FAILURE MODES",
    primaryRank: 1,
    secondaryRank: null,
    routeEnabled: true,
    primaryCta: {
      label: "Read the case study",
      href: "/work/transactional-operations-platform",
      kind: "internal",
    },
    secondaryCta: {
      label: "See architecture & decisions",
      href: "/work/transactional-operations-platform#architecture",
      kind: "internal",
    },
  },
  {
    slug: "endurance-coordination-bot",
    title: "Endurance Coordination Bot",
    state: "VERIFIED_PUBLIC_MAIN_TESTS_CI",
    publicLabel: "VERIFIED PUBLIC MAIN — TESTS + CI",
    problem: "Time-zone coordination gets complicated when availability windows cross dates and each participant reports local time differently.",
    summary: "A public Java/JDA coordination project with explicit time-zone and availability-domain logic, with reviewed recovery work merged to the default branch.",
    contribution: "Authentic public project; the reviewed recovery slice is merged to main with tests, CI, truthful documentation and security hardening. Complete JDA coverage and production readiness are not claimed.",
    themes: ["JAVA 21", "MAVEN", "JDA"],
    proofCue: "MAIN · 10 TESTS · GREEN CI",
    primaryRank: 2,
    secondaryRank: null,
    routeEnabled: true,
    primaryCta: {
      label: "Inspect code & tests",
      href: "https://github.com/Parkts310120/bot_discord/tree/629049d5122938bc29354588158193f81d316cee",
      kind: "external",
    },
    secondaryCta: {
      label: "See current limitations",
      href: "/work/endurance-coordination-bot#limitations",
      kind: "internal",
    },
  },
  {
    slug: "ai-workflow-runtime-lab",
    title: "AI Workflow Runtime Lab",
    state: "VERIFIED_PUBLIC_MAIN_BOUNDED_RUNTIME_TESTS_CI",
    publicLabel: "VERIFIED PUBLIC MAIN — BOUNDED RUNTIME + TESTS + CI",
    problem: "How do you make an AI workflow useful without letting provider output authorize itself or refine forever?",
    summary: "A clean-room Python 3.12 proof of bounded workflow execution where the application owns budgets, state transitions, deterministic evaluation, deny-by-default authority, external approval records, sanitized audit events and fail-closed behavior.",
    contribution: "Separate public clean-room proof with new public history and a deterministic ScriptedProvider; it demonstrates only the bounded R1 mechanisms and does not imply equivalence to private source, live-model integration, real external tools or production operation.",
    themes: ["BOUNDED RUNTIME", "AUTHORITY", "AUDIT"],
    proofCue: "47/47 tests + green post-merge main CI",
    primaryRank: 3,
    secondaryRank: null,
    routeEnabled: true,
    primaryCta: {
      label: "Inspect code & tests",
      href: "https://github.com/Parkts310120/ai-workflow-runtime-lab/tree/11a64ef5967ea3f41b0b57bb4922840df819777f",
      kind: "external",
    },
    secondaryCta: {
      label: "See current limitations",
      href: "/work/ai-workflow-runtime-lab#limitations",
      kind: "internal",
    },
  },
  {
    slug: "time-series-volatility-research",
    title: "Time-Series Volatility Research",
    state: "RESEARCH",
    publicLabel: "RESEARCH",
    problem: "Model comparison is not meaningful if the evaluation pipeline leaks future data.",
    summary: "Leakage-safe experiment methodology with chronological splits, train-only scaling, partition-safe windows and dataset integrity hashes.",
    contribution: "Academic/research engineering in a currently non-public destination repository.",
    themes: ["TIME SERIES", "REPRODUCIBILITY", "LEAKAGE CONTROL"],
    proofCue: "LEAKAGE-SAFE EXPERIMENT METHODOLOGY",
    primaryRank: null,
    secondaryRank: 1,
    routeEnabled: true,
    primaryCta: {
      label: "Review the methodology",
      href: "/work/time-series-volatility-research",
      kind: "internal",
    },
  },
  {
    slug: "causal-market-replay",
    title: "Causal Market Replay",
    state: "PUBLIC_PROOF_PENDING",
    publicLabel: "PUBLIC PROOF PENDING",
    problem: "A backtest is only credible if it cannot see the future.",
    summary: "Point-in-time simulation that separates observation, availability, decision and execution clocks.",
    contribution: "Point-in-time simulation design/implementation distilled from private-source engineering; public implementation remains separate.",
    themes: ["POINT IN TIME", "CAUSALITY", "LEAKAGE TESTS"],
    proofCue: "SANITIZED TEMPORAL MODEL",
    primaryRank: null,
    secondaryRank: 2,
    routeEnabled: true,
    primaryCta: {
      label: "Read the technical case",
      href: "/work/causal-market-replay",
      kind: "internal",
    },
  },
  {
    slug: "warehouse-flow-api",
    title: "Warehouse Flow API",
    state: "IN_BUILD",
    publicLabel: "IN BUILD",
    problem: "Can a warehouse workflow stay inspectable when each lifecycle transition has its own rules?",
    summary: "A planned public backend proof around auditable warehouse lifecycle states, authenticated ownership and failure-safe transitions.",
    contribution: "Planned independent public artifact using a generic logistics domain and synthetic data.",
    themes: ["BACKEND", "STATE", "AUDITABILITY"],
    proofCue: "PUBLIC EVIDENCE NOT READY",
    primaryRank: null,
    secondaryRank: 3,
    routeEnabled: false,
  },
] as const satisfies readonly WorkItem[];

export const workItems: readonly WorkItem[] = work;

export const primaryWork = workItems
  .filter((item): item is WorkItem & { primaryRank: 1 | 2 | 3 } => item.primaryRank !== null)
  .toSorted((a, b) => a.primaryRank - b.primaryRank);

export const secondaryWork = workItems
  .filter((item): item is WorkItem & { secondaryRank: 1 | 2 | 3 } => item.secondaryRank !== null)
  .toSorted((a, b) => a.secondaryRank - b.secondaryRank);

export const routableWork = workItems.filter((item) => item.routeEnabled);

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return workItems.find((item) => item.slug === slug);
}
