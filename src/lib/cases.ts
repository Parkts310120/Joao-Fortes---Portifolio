export type CaseDecision = {
  title: string;
  body: string;
};

export type CaseFailure = {
  condition: string;
  behavior: string;
  evidence: string;
};

export type CaseStudy = {
  slug: string;
  typeLabel: string;
  title: string;
  summary: string;
  contribution: string;
  meta: {
    type: string;
    focus: string;
    evidence: string;
    source: string;
  };
  contextTitle: string;
  context: string;
  constraints: readonly string[];
  architecture: readonly string[];
  architectureSummary: string;
  decisions: readonly CaseDecision[];
  failureModes: readonly CaseFailure[];
  evidence: readonly string[];
  outcome: string;
  disclosure?: string;
  limitations: readonly string[];
  externalProof?: {
    label: string;
    href: string;
  };
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "transactional-operations-platform",
    typeLabel: "SANITIZED ARCHITECTURE CASE",
    title: "Transactional Operations Platform",
    summary: "Keeping inventory, order and payment state coherent under retries and partial failure.",
    contribution: "Architecture and reliability decisions distilled from real engineering work; original source remains private.",
    meta: {
      type: "Sanitized case",
      focus: "Reliability + state",
      evidence: "Architecture",
      source: "Private / not published",
    },
    contextTitle: "Reliable state under retries and partial failure.",
    context: "The case studies a transactional workflow where inventory, order and payment state cannot drift apart when requests retry or external callbacks arrive late.",
    constraints: [
      "Atomic reservation",
      "Idempotent retries",
      "Server-side authorization",
      "Auditability",
      "Separate payment / delivery state",
    ],
    architecture: [
      "Client / operator",
      "API + authorization",
      "Reservation boundary",
      "Inventory + orders",
      "Payment provider",
      "Reconciliation",
      "Canonical state",
      "Audit trail",
    ],
    architectureSummary: "Requests cross a server-side authorization boundary before canonical order and inventory state are committed. External payment state is reconciled later; fulfillment and audit remain separate transitions.",
    decisions: [
      {
        title: "Atomic reservation boundary",
        body: "Prevent overselling by reserving inventory server-side as one transactional decision rather than treating the browser as authority.",
      },
      {
        title: "Canonical reconciliation",
        body: "Treat external payment callbacks as inputs to reconcile, not as the source of truth for order existence.",
      },
      {
        title: "Explicit state separation",
        body: "Payment and delivery progress evolve independently instead of sharing one overloaded status.",
      },
    ],
    failureModes: [
      {
        condition: "Duplicate request",
        behavior: "Idempotency key returns the canonical result instead of creating a second order effect.",
        evidence: "Design invariant",
      },
      {
        condition: "Payment callback retry",
        behavior: "Reconciliation remains repeatable and financial state stays explicit.",
        evidence: "Decision evidence",
      },
      {
        condition: "Partial inventory failure",
        behavior: "The reservation boundary rejects or releases safely instead of reporting partial success.",
        evidence: "Architecture",
      },
    ],
    evidence: [
      "Sanitized architecture and state-machine reasoning.",
      "Documented retry, authorization, reconciliation and failure-handling strategy.",
      "Public case material contains no private source code, identities or operational data.",
    ],
    outcome: "The useful result is a reviewable reliability story with explicit intermediate states—not an unsupported production metric.",
    disclosure: "Sanitized architecture case study derived from real engineering work. Original source remains private.",
    limitations: [
      "The public artifact is a sanitized architecture case, not the original repository.",
      "No private operational data, URLs, identities or production metrics are published.",
      "Measured outcomes appear only when a public, reproducible evidence path exists.",
    ],
  },
  {
    slug: "endurance-coordination-bot",
    typeLabel: "VERIFIED PUBLIC PR — MERGE PENDING",
    title: "Endurance Coordination Bot",
    summary: "Public Java/JDA coordination logic for race scheduling, time zones and driver availability.",
    contribution: "Authentic public project with preserved history. Current portfolio proof is a bounded recovery PR around tests, CI, truthful documentation and security hardening.",
    meta: {
      type: "Public engineering proof",
      focus: "Java + time zones",
      evidence: "Verified PR",
      source: "Public PR / merge pending",
    },
    contextTitle: "Time-zone coordination needs domain rules, not string arithmetic.",
    context: "Availability windows can cross dates and every participant may report local time differently. The current proof concentrates on deterministic domain/service behavior and build verification rather than claiming full Discord integration coverage.",
    constraints: [
      "Java 21",
      "Maven verify",
      "Time-zone conversion",
      "Driver availability",
      "Preserved history",
    ],
    architecture: [
      "Discord command",
      "JDA adapter",
      "Command handler",
      "Domain service",
      "Race schedule",
      "Availability windows",
      "Time-zone rules",
      "Response formatting",
    ],
    architectureSummary: "The public project separates transport-facing Discord/JDA behavior from scheduling and availability rules. The current recovery PR strengthens the testable domain/service path; adapter coverage remains a known limitation.",
    decisions: [
      {
        title: "Exact-SHA evidence",
        body: "Portfolio claims bind to one reviewed commit instead of treating a moving branch as permanent proof.",
      },
      {
        title: "Build verification first",
        body: "Java 21 Maven verification and deterministic tests establish a bounded proof surface before broader refactoring.",
      },
      {
        title: "Limit coverage claims",
        body: "Green domain/service tests do not get relabeled as complete JDA or end-to-end Discord coverage.",
      },
    ],
    failureModes: [
      {
        condition: "Time-zone/date boundary",
        behavior: "Availability is handled as domain time rather than display-only strings.",
        evidence: "Public domain logic",
      },
      {
        condition: "Recovery regression",
        behavior: "The reviewed branch is protected by automated tests and CI.",
        evidence: "10 tests + green CI",
      },
      {
        condition: "Evidence drift",
        behavior: "The portfolio records the reviewed SHA and merge-pending state explicitly.",
        evidence: "SHA-bound proof",
      },
    ],
    evidence: [
      "PR #1 exact reviewed SHA f3317da84d442b301660dee9ab617aa4fa9f5cc1.",
      "Java 21; mvn -B --no-transfer-progress verify; 10 tests; 0 failures; 0 errors; 0 skipped; CI green.",
      "QA review completed; Security review completed; history-aware reachable-text secret scan PASS with documented method limitation.",
      "PR #1 is open / unmerged: VERIFIED PUBLIC PR — MERGE PENDING.",
    ],
    outcome: "A real public repository now has inspectable tests, CI and bounded hardening evidence without rewriting its original history.",
    limitations: [
      "PR #1 is still open and is not merged default-branch proof.",
      "The repository is not PIN_READY.",
      "JDA/Discord integration coverage is incomplete; handler/domain separation remains a later refactor.",
      "Race-duration validation, empty availability behavior and interval-overlap policy retain known gaps.",
      "Persistence remains in-memory/process-local.",
      "The secret-scan PASS is bounded to the documented reachable-text/history method.",
    ],
    externalProof: {
      label: "Review the verified PR",
      href: "https://github.com/Parkts310120/bot_discord/pull/1",
    },
  },
  {
    slug: "ai-workflow-runtime-lab",
    typeLabel: "PUBLIC PROOF PENDING",
    title: "AI Workflow Runtime Lab",
    summary: "Bounded AI orchestration where evaluation and authority stay separate.",
    contribution: "Design and implementation work on bounded orchestration and authority controls distilled into a sanitized case; the independent public lab is not ready yet.",
    meta: {
      type: "Sanitized engineering case",
      focus: "Bounded autonomy",
      evidence: "Architecture",
      source: "Public proof pending",
    },
    contextTitle: "Useful model output should not authorize itself.",
    context: "The workflow treats model calls as one input to an inspectable process: persistent work state, bounded refinement, deterministic gates and human authority before privileged actions.",
    constraints: [
      "Bounded calls",
      "Explicit permissions",
      "Persistent run state",
      "Human approval",
      "No silent cloud fallback",
    ],
    architecture: [
      "Brief",
      "Persistent queue",
      "Builder",
      "Critic",
      "Candidate registry",
      "QA + Security",
      "Human staging",
      "Disabled activation",
    ],
    architectureSummary: "A brief enters a persistent queue, Builder/Critic refinement is bounded, candidates pass QA and Security, and human staging remains separate from any privileged activation.",
    decisions: [
      {
        title: "Bound iterations and calls",
        body: "Budget exhaustion is a normal terminal state instead of an invitation to loop indefinitely.",
      },
      {
        title: "Separate quality from authority",
        body: "Critic or QA approval cannot grant write/execute permission.",
      },
      {
        title: "Deny by default",
        body: "Tool access must match explicit declarations and approval state; activation is a separate boundary.",
      },
    ],
    failureModes: [
      {
        condition: "Repeated critic rejection",
        behavior: "The run stops at a deterministic budget instead of recursive self-refinement.",
        evidence: "Bounded workflow design",
      },
      {
        condition: "Unauthorized tool request",
        behavior: "Capability policy blocks undeclared or escalated access.",
        evidence: "Authority model",
      },
      {
        condition: "Provider failure",
        behavior: "Run state remains inspectable and cloud fallback is never implicit.",
        evidence: "Runtime boundary",
      },
    ],
    evidence: [
      "Sanitized runtime architecture: budgets, candidate lifecycle, QA/security gates and deny-by-default permissions.",
      "Private-source evidence supports the engineering case; independent public proof is not ready.",
    ],
    outcome: "The system makes autonomy finite and inspectable: model quality is evaluated without turning model output into authority.",
    disclosure: "Sanitized engineering case derived from private-source work. The independent public proof artifact remains pending.",
    limitations: [
      "The public AI Workflow Runtime Lab repository does not exist yet.",
      "No public test/CI/demo/source CTA is presented.",
      "Policy approval alone does not make a privileged tool adapter safe.",
      "Bounded loops may stop before an ideal answer is found.",
    ],
  },
  {
    slug: "time-series-volatility-research",
    typeLabel: "RESEARCH",
    title: "Time-Series Volatility Research",
    summary: "Reproducible model comparison with temporal hygiene as part of the software design.",
    contribution: "Academic/research engineering in a currently non-public destination repository.",
    meta: {
      type: "Research case",
      focus: "Temporal evaluation",
      evidence: "Methodology",
      source: "Repository not public",
    },
    contextTitle: "A model comparison is meaningless if preprocessing sees the future.",
    context: "The research pipeline compares recurrent model families under one chronological protocol, keeping split logic, scaling, sequence construction and dataset identity explicit.",
    constraints: [
      "Chronological split",
      "Train-only scaling",
      "Partition-local windows",
      "Future-shifted target",
      "Dataset hashes",
    ],
    architecture: [
      "Data sources",
      "Features + target",
      "Chronological split",
      "Train-only scaling",
      "Partition windows",
      "LSTM / GRU",
      "Metrics + artifacts",
      "Integrity hashes",
    ],
    architectureSummary: "The model layer is a controlled variable. Temporal split, preprocessing, windowing and artifact lineage are shared so comparisons do not inherit hidden leakage.",
    decisions: [
      {
        title: "One evaluation protocol",
        body: "Model and feature combinations change while the measurement rules stay fixed.",
      },
      {
        title: "Train-only preprocessing",
        body: "Validation and test distributions do not influence scaler fitting.",
      },
      {
        title: "Separate smoke from research",
        body: "Synthetic execution proves software wiring, not empirical model quality.",
      },
    ],
    failureModes: [
      {
        condition: "Random split leakage",
        behavior: "Chronological partitions preserve the time axis.",
        evidence: "Methodology",
      },
      {
        condition: "Scaler leakage",
        behavior: "Scalers are fit only on training data.",
        evidence: "Pipeline invariant",
      },
      {
        condition: "Synthetic result confusion",
        behavior: "Smoke artifacts are labeled separately from research evidence.",
        evidence: "Evidence boundary",
      },
    ],
    evidence: [
      "Temporal evaluation controls, test inventory and reproducibility design.",
      "Dataset hashing ties artifacts to exact inputs.",
      "No public repository link is shown until publication is separately approved and verified.",
    ],
    outcome: "The main evidence is experiment discipline: future information is structurally excluded from preprocessing and evaluation.",
    limitations: [
      "The repository is not public.",
      "No profitability, alpha or production-trading claim is made.",
      "Optional NLP sentiment is not presented as validated unless the dated-news experiment is actually run and verified.",
      "Model metrics do not imply production readiness.",
    ],
  },
  {
    slug: "causal-market-replay",
    typeLabel: "PUBLIC PROOF PENDING",
    title: "Causal Market Replay",
    summary: "Point-in-time simulation that reconstructs what information was legally available at each decision.",
    contribution: "Point-in-time simulation design and implementation distilled from private-source engineering; the public implementation must be independently built.",
    meta: {
      type: "Sanitized technical case",
      focus: "Causal correctness",
      evidence: "Temporal model",
      source: "Public proof pending",
    },
    contextTitle: "A backtest is only credible if it cannot see the future.",
    context: "The replay engine treats observation, information availability, decision, order submission, execution and later outcome reveal as separate clocks.",
    constraints: [
      "Point-in-time data",
      "Historical membership",
      "Delayed execution",
      "Benchmark provenance",
      "No future queries",
    ],
    architecture: [
      "Raw data",
      "Temporal envelope",
      "PIT guard",
      "Canonical snapshot",
      "Decision",
      "Constraints",
      "Execution",
      "Audit",
    ],
    architectureSummary: "Every strategy decision references one canonical point-in-time snapshot. Data that becomes available after the decision is rejected, and execution occurs at a later legal clock.",
    decisions: [
      {
        title: "Explicit availability time",
        body: "A timestamp is not enough: the data model records when information became legally usable.",
      },
      {
        title: "Canonical snapshot",
        body: "Downstream strategies reference one snapshot identity instead of rebuilding looser dataframes.",
      },
      {
        title: "No same-bar close execution",
        body: "Execution occurs after the decision point rather than using a price that was not yet known.",
      },
    ],
    failureModes: [
      {
        condition: "Future-bar leakage",
        behavior: "The point-in-time guard rejects data unavailable at decision time.",
        evidence: "Temporal invariant",
      },
      {
        condition: "Future membership",
        behavior: "Historical universe intervals are versioned instead of projecting current membership backward.",
        evidence: "Snapshot design",
      },
      {
        condition: "External future query",
        behavior: "Certified replay requires a fail-closed external-data boundary.",
        evidence: "Isolation requirement",
      },
    ],
    evidence: [
      "Sanitized temporal model, canonical snapshot invariant and adversarial leakage-test design.",
      "Private-source evidence supports the case; public repository proof remains pending.",
    ],
    outcome: "The replay reframes backtesting as reconstructing the information set available to the decision maker, not optimizing a result after the fact.",
    disclosure: "Sanitized technical case derived from private-source engineering. Public proof remains pending.",
    limitations: [
      "The public Causal Market Replay repository does not exist yet.",
      "No public adversarial-test or CI result is claimed.",
      "Application-level guards are not equivalent to process/network isolation.",
      "Causal replay validates process integrity; it does not prove profitability.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}
