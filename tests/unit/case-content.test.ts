import { describe, expect, it } from "vitest";
import { caseStudies, getCaseStudy } from "../../src/lib/cases";

describe("case-study registry", () => {
  it("publishes only the five evidence-ready case routes", () => {
    expect(caseStudies.map((item) => item.slug)).toEqual([
      "transactional-operations-platform",
      "endurance-coordination-bot",
      "ai-workflow-runtime-lab",
      "time-series-volatility-research",
      "causal-market-replay",
    ]);
  });

  it("keeps Warehouse Flow API unroutable", () => {
    expect(getCaseStudy("warehouse-flow-api")).toBeUndefined();
  });

  it("marks Transactional as sanitized and source-private", () => {
    const item = getCaseStudy("transactional-operations-platform");
    expect(item?.typeLabel).toBe("SANITIZED ARCHITECTURE CASE");
    expect(item?.meta.source).toMatch(/private/i);
    expect(item?.disclosure).toMatch(/original source remains private/i);
  });

  it("binds the public bot proof to the exact source/merge SHAs and bounded main evidence", () => {
    const item = getCaseStudy("endurance-coordination-bot");
    expect(item?.evidence.join(" ")).toContain("f3317da84d442b301660dee9ab617aa4fa9f5cc1");
    expect(item?.evidence.join(" ")).toMatch(/10 tests/i);
    expect(item?.evidence.join(" ")).toContain("629049d5122938bc29354588158193f81d316cee");
    expect(item?.evidence.join(" ")).toMatch(/post-merge main CI/i);
    expect(JSON.stringify(item)).not.toMatch(/merge pending|open \/ unmerged/i);
    expect(item?.limitations.join(" ")).toMatch(/not.*PIN_READY/i);
  });

  it("binds AI Runtime to verified public main, exact CI proof and bounded clean-room limitations", () => {
    const item = getCaseStudy("ai-workflow-runtime-lab");
    expect(item?.typeLabel).toBe("VERIFIED PUBLIC MAIN — BOUNDED RUNTIME + TESTS + CI");
    expect(item?.meta.evidence).toMatch(/47.*tests.*CI/i);
    expect(item?.evidence.join(" ")).toContain("11a64ef5967ea3f41b0b57bb4922840df819777f");
    expect(item?.evidence.join(" ")).toContain("37628229866");
    expect(item?.evidence.join(" ")).toMatch(/47\s*\/\s*47/);
    expect(item?.disclosure).toMatch(/clean-room/i);
    expect(item?.limitations.join(" ")).toMatch(/no live LLM/i);
    expect(item?.limitations.join(" ")).toMatch(/not.*security certification|security certification/i);
    expect(item?.externalProof).toEqual({
      label: "Inspect code & tests",
      href: "https://github.com/Parkts310120/ai-workflow-runtime-lab/tree/11a64ef5967ea3f41b0b57bb4922840df819777f",
    });
    expect(JSON.stringify(item)).not.toMatch(/PUBLIC PROOF PENDING|repository does not exist yet|public proof.*not ready/i);
  });

  it("never embeds private source account or localhost destinations", () => {
    const serialized = JSON.stringify(caseStudies);
    expect(serialized).not.toContain("f1parkts310120-png");
    expect(serialized).not.toContain("localhost");
    expect(serialized).not.toContain("127.0.0.1");
  });
});
