import { test, expect } from "@playwright/test";

for (const route of ["/", "/work/transactional-operations-platform"]) {
  test(`shared favicon is served: ${route}`, async ({ page, request }) => {
    await page.goto(route);
    const icon = page.locator('head link[rel="icon"]');
    await expect(icon).toHaveAttribute("href", "/favicon.svg");
    const response = await request.get("/favicon.svg");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/svg+xml");
    expect(await response.text()).toContain('<svg');
  });
}
