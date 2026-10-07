import { describe, expect, it } from "vitest";
import {
  evidenceStates,
  getWorkBySlug,
  primaryWork,
  routableWork,
  secondaryWork,
  workItems,
} from "../../src/lib/work";

describe("work registry", () => {
  it("keeps exactly three primary items in canonical order", () => {
    expect(primaryWork.map((item) => item.slug)).toEqual([
      "transactional-operations-platform",
      "endurance-coordination-bot",
      "ai-workflow-runtime-lab",
    ]);
  });

  it("keeps exactly three secondary items in canonical order", () => {
    expect(secondaryWork.map((item) => item.slug)).toEqual([
      "time-series-volatility-research",
      "causal-market-replay",
      "warehouse-flow-api",
    ]);
  });

  it("requires each primary card to expose contribution, 2-5 themes and one proof cue", () => {
    for (const item of primaryWork) {
      expect(item.contribution.trim().length).toBeGreaterThan(20);
      expect(item.themes.length).toBeGreaterThanOrEqual(2);
      expect(item.themes.length).toBeLessThanOrEqual(5);
      expect(item.proofCue.trim().length).toBeGreaterThan(4);
    }
  });

  it("never exposes private-source or localhost destinations", () => {
    const hrefs = workItems.flatMap((item) =>
      [item.primaryCta?.href, item.secondaryCta?.href].filter(Boolean),
    );

    for (const href of hrefs) {
      expect(href).not.toContain("f1parkts310120-png");
      expect(href).not.toContain("localhost");
      expect(href).not.toContain("127.0.0.1");
    }
  });

  it("keeps in-build Warehouse non-routable and without CTAs", () => {
    const warehouse = getWorkBySlug("warehouse-flow-api");
    expect(warehouse?.state).toBe("IN_BUILD");
    expect(warehouse?.routeEnabled).toBe(false);
    expect(warehouse?.primaryCta).toBeUndefined();
    expect(warehouse?.secondaryCta).toBeUndefined();
    expect(routableWork.map((item) => item.slug)).not.toContain("warehouse-flow-api");
  });

  it("binds bot proof to the verified main and never calls it PIN_READY", () => {
    const bot = getWorkBySlug("endurance-coordination-bot");
    expect(bot?.state).toBe("VERIFIED_PUBLIC_MAIN_TESTS_CI");
    expect(bot?.publicLabel).toContain("TESTS + CI");
    expect(bot?.publicLabel).not.toContain("PIN_READY");
    expect(bot?.primaryCta?.href).toBe("https://github.com/Parkts310120/bot_discord/tree/629049d5122938bc29354588158193f81d316cee");
  });

  it("promotes AI Runtime to a distinct verified bounded-runtime state on immutable reviewed main", () => {
    const ai = getWorkBySlug("ai-workflow-runtime-lab");
    expect(evidenceStates).toContain("VERIFIED_PUBLIC_MAIN_BOUNDED_RUNTIME_TESTS_CI");
    expect(ai?.state).toBe("VERIFIED_PUBLIC_MAIN_BOUNDED_RUNTIME_TESTS_CI");
    expect(ai?.publicLabel).toBe("VERIFIED PUBLIC MAIN — BOUNDED RUNTIME + TESTS + CI");
    expect(ai?.problem).toBe("How do you make an AI workflow useful without letting provider output authorize itself or refine forever?");
    expect(ai?.proofCue).toBe("47/47 tests + green post-merge main CI");
    expect(ai?.primaryCta).toEqual({
      label: "Inspect code & tests",
      href: "https://github.com/Parkts310120/ai-workflow-runtime-lab/tree/11a64ef5967ea3f41b0b57bb4922840df819777f",
      kind: "external",
    });
    expect(ai?.secondaryCta).toEqual({
      label: "See current limitations",
      href: "/work/ai-workflow-runtime-lab#limitations",
      kind: "internal",
    });
    expect(JSON.stringify(ai)).not.toMatch(/PUBLIC PROOF PENDING|public lab is not ready/i);
  });

  it("keeps public-proof-pending work free of external source/demo CTAs", () => {
    const pending = workItems.filter((item) => item.state === "PUBLIC_PROOF_PENDING");
    for (const item of pending) {
      expect(item.primaryCta?.kind).not.toBe("external");
      expect(item.secondaryCta?.kind).not.toBe("external");
    }
  });

  it("has unique slugs", () => {
    const slugs = workItems.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
