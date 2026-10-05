import { test, expect } from "@playwright/test";

test("home exposes the approved evidence hierarchy", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("João Paulo Fortes");

  const cards = page.locator("[data-primary-card]");
  await expect(cards).toHaveCount(3);
  await expect(cards.locator("h3")).toHaveText([
    "Transactional Operations Platform",
    "Endurance Coordination Bot",
    "AI Workflow Runtime Lab",
  ]);

  await expect(cards.nth(0).getByText("SANITIZED CASE", { exact: true })).toBeVisible();
  await expect(cards.nth(1).getByText("VERIFIED PUBLIC PR — MERGE PENDING", { exact: true })).toBeVisible();
  await expect(cards.nth(2).getByText("PUBLIC PROOF PENDING", { exact: true })).toBeVisible();

  const botPr = page.getByRole("link", { name: "Review the verified PR" });
  await expect(botPr).toHaveAttribute("href", "https://github.com/Parkts310120/bot_discord/pull/1");

  const warehouse = page.locator('[data-work-slug="warehouse-flow-api"]');
  await expect(warehouse).toContainText("IN BUILD");
  await expect(warehouse.locator("a")).toHaveCount(0);

  await expect(page.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
});

test("desktop navigation exposes four content destinations and GitHub", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link", { name: "Work", exact: true })).toHaveAttribute("href", "#work");
  await expect(nav.getByRole("link", { name: "Engineering", exact: true })).toHaveAttribute("href", "#engineering");
  await expect(nav.getByRole("link", { name: "About", exact: true })).toHaveAttribute("href", "#about");
  await expect(nav.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute("href", "#contact");
  await expect(nav.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute("href", "https://github.com/Parkts310120");
});


test("contact panel does not publish a fake contact destination", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: /^Contact\b/i })).toHaveCount(0);
  await expect(contact.getByRole("link", { name: /GitHub/i })).toHaveCount(1);
});
