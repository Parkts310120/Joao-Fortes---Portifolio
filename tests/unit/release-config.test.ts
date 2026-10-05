import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("release platform config", () => {
  it("normalizes trailing slashes at the Vercel edge", () => {
    const configPath = resolve(process.cwd(), "vercel.json");
    const config = existsSync(configPath)
      ? JSON.parse(readFileSync(configPath, "utf8"))
      : {};

    expect(config.trailingSlash).toBe(false);
  });
});
