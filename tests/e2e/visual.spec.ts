import { mkdirSync } from "node:fs";
import { test } from "@playwright/test";

const dir = "artifacts/screenshots";

test.beforeAll(() => {
  mkdirSync(dir, { recursive: true });
});

const homeViewports = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 1000 },
  { name: "1920", width: 1920, height: 1080 },
];

for (const viewport of homeViewports) {
  test(`capture Home ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    await page.screenshot({
      path: `${dir}/home-${viewport.name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
}

for (const viewport of [
  { name: "390", width: 390, height: 844 },
  { name: "1440", width: 1440, height: 1000 },
]) {
  test(`capture Transactional case ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/work/transactional-operations-platform");
    await page.screenshot({
      path: `${dir}/case-transactional-${viewport.name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
}
