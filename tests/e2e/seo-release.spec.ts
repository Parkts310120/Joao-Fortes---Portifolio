import { test, expect } from "@playwright/test";

const ORIGIN = "https://joao-fortes-portifolio.vercel.app";
const ROUTES = [
  "/",
  "/work/transactional-operations-platform",
  "/work/endurance-coordination-bot",
  "/work/ai-workflow-runtime-lab",
  "/work/time-series-volatility-research",
  "/work/causal-market-replay",
] as const;

for (const route of ROUTES) {
  test(`release metadata is canonical and claim-preserving: ${route}`, async ({ page }) => {
    await page.goto(route);

    const expectedUrl = `${ORIGIN}${route === "/" ? "" : route}`;
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expectedUrl);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description ?? "");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", expectedUrl);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", description ?? "");
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  });
}

test("robots allows the public P0 site and points to the production sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("User-agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
});

test("sitemap contains only the six release-eligible routes", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("xml");
  const body = await response.text();

  for (const route of ROUTES) {
    const expectedUrl = `${ORIGIN}${route === "/" ? "" : route}`;
    expect(body).toContain(`<loc>${expectedUrl}</loc>`);
  }

  expect(body).not.toContain("warehouse-flow-api");
  expect(body).not.toContain("endurance-engineer.vercel.app");
});
