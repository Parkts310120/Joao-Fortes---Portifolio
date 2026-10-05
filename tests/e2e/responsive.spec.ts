import { test, expect } from "@playwright/test";

const viewports = [
  { name: "360", width: 360, height: 800 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 1000 },
  { name: "1920", width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`home has no horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
  });
}

for (const viewport of [
  { name: "360", width: 360, height: 800 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 1000 },
  { name: "1920", width: 1920, height: 1080 },
]) {
  test(`transactional case has no horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/work/transactional-operations-platform");
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
  });
}

test("primary work is one column on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const cards = page.locator("[data-primary-card]");
  const boxes = await cards.evaluateAll((nodes) =>
    nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { x: Math.round(rect.x), width: Math.round(rect.width) };
    }),
  );
  expect(new Set(boxes.map((box) => box.x)).size).toBe(1);
  for (const box of boxes) expect(box.width).toBeGreaterThan(300);
});

test("case metadata is static below 1024 and sticky on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/work/transactional-operations-platform");
  expect(await page.locator(".case-meta").evaluate((el) => getComputedStyle(el).position)).toBe("static");

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload();
  expect(await page.locator(".case-meta").evaluate((el) => getComputedStyle(el).position)).toBe("sticky");
});

test("touch targets keep the menu trigger at least 44 by 44", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const box = await page.getByRole("button", { name: "Menu" }).boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
});

// Catches undersized link/button hit areas, including case navigation and footer.
const mobileRoutes = ["/", "/work/transactional-operations-platform", "/work/endurance-coordination-bot", "/work/ai-workflow-runtime-lab", "/work/time-series-volatility-research", "/work/causal-market-replay"];
for (const width of [360, 390, 768]) {
  for (const route of mobileRoutes) {
    test(`all mobile touch targets are 44 by 44: ${width} ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(route);
      await page.keyboard.press("Tab"); // Include the revealed skip link.
      const checkTargets = async () => {
        const controls = page.locator("a[href], button, input:not([type=hidden]), select, textarea, [role=button], [tabindex='0']");
        for (const control of await controls.all()) {
          if (!(await control.isVisible())) continue;
          const box = await control.boundingBox();
          expect(box).not.toBeNull();
          const label = await control.innerText();
          expect(box!.width, `${label} width`).toBeGreaterThanOrEqual(44);
          expect(box!.height, `${label} height`).toBeGreaterThanOrEqual(44);
        }
      };
      await checkTargets();
      const menu = page.getByRole("button", { name: "Menu", exact: true });
      if (await menu.isVisible()) {
        await menu.click();
        await checkTargets();
      }
    });
  }
}
