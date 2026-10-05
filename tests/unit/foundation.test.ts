import { describe, expect, it } from "vitest";
import { primaryWork } from "../../src/lib/work";

describe("portfolio foundation", () => {
  it("loads the canonical three primary work items", () => {
    expect(primaryWork.map((item) => item.slug)).toEqual([
      "transactional-operations-platform",
      "endurance-coordination-bot",
      "ai-workflow-runtime-lab",
    ]);
  });
});
