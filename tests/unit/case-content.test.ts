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

  it("binds the public bot proof to the exact reviewed SHA and merge-pending state", () => {
    const item = getCaseStudy("endurance-coordination-bot");
    expect(item?.evidence.join(" ")).toContain("f3317da84d442b301660dee9ab617aa4fa9f5cc1");
    expect(item?.evidence.join(" ")).toMatch(/10 tests/i);
    expect(item?.evidence.join(" ")).toMatch(/merge pending|open|unmerged/i);
    expect(item?.limitations.join(" ")).toMatch(/not.*PIN_READY/i);
  });

  it("never embeds private source account or localhost destinations", () => {
    const serialized = JSON.stringify(caseStudies);
    expect(serialized).not.toContain("f1parkts310120-png");
    expect(serialized).not.toContain("localhost");
    expect(serialized).not.toContain("127.0.0.1");
  });
});
