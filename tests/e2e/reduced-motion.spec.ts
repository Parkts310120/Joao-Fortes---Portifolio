import { test, expect } from "@playwright/test";

test("reduced motion removes project-card translation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const card = page.locator("[data-primary-card]").first();
  await card.hover();
  await expect(card).toBeVisible();
  expect(await card.evaluate((el) => getComputedStyle(el).transform)).toBe("none");
});

test("keyboard focus remains visibly outlined", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  const outline = await skip.evaluate((el) => {
    const style = getComputedStyle(el);
    return { style: style.outlineStyle, width: style.outlineWidth };
  });
  expect(outline.style).not.toBe("none");
  expect(parseFloat(outline.width)).toBeGreaterThanOrEqual(2);
});
