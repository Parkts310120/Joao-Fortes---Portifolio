import { test, expect } from "@playwright/test";

const routes = [
  "transactional-operations-platform",
  "endurance-coordination-bot",
  "ai-workflow-runtime-lab",
  "time-series-volatility-research",
  "causal-market-replay",
];

for (const slug of routes) {
  test(`case route renders: ${slug}`, async ({ page }) => {
    const response = await page.goto(`/work/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("link", { name: /Work/i }).first()).toHaveAttribute("href", "/#work");
    await expect(page.getByRole("heading", { name: "Limitations" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Evidence & outcome" })).toBeVisible();
  });
}

test("transactional case exposes sanitized boundary and architecture summary", async ({ page }) => {
  await page.goto("/work/transactional-operations-platform");
  await expect(page.getByText("SANITIZED ARCHITECTURE CASE", { exact: true })).toBeVisible();
  await expect(page.getByText(/original source remains private/i)).toBeVisible();
  await expect(page.locator("[data-architecture-map]")).toBeVisible();
  await expect(page.locator("[data-architecture-map] [data-node]")).toHaveCount(8);
});

test("bot case exposes exact reviewed PR evidence without implying merge", async ({ page }) => {
  await page.goto("/work/endurance-coordination-bot");
  await expect(page.getByText(/VERIFIED PUBLIC PR/i).first()).toBeVisible();
  await expect(page.getByText(/f3317da84d442b301660dee9ab617aa4fa9f5cc1/)).toBeVisible();
  await expect(page.getByText(/10 tests/i)).toBeVisible();
  await expect(page.getByText(/merge pending|open.*unmerged/i).first()).toBeVisible();
  await expect(page.getByText(/not.*PIN_READY/i).first()).toBeVisible();
});

test("Warehouse Flow API has no generated deep route", async ({ page }) => {
  const response = await page.goto("/work/warehouse-flow-api");
  expect(response?.status()).toBe(404);
});
