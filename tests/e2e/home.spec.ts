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
  await expect(cards.nth(1).getByText("VERIFIED PUBLIC MAIN — TESTS + CI", { exact: true })).toBeVisible();
  await expect(cards.nth(2).getByText("PUBLIC PROOF PENDING", { exact: true })).toBeVisible();

  const botPr = page.getByRole("link", { name: "Inspect code & tests" });
  await expect(botPr).toHaveAttribute("href", "https://github.com/Parkts310120/bot_discord/tree/629049d5122938bc29354588158193f81d316cee");

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


test("home exposes professional contact and case detail destinations", async ({ page }) => {
  await page.goto("/");
  const linkedIn = page.locator("#contact").getByRole("link", { name: "Connect on LinkedIn" });
  await expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/joao-paulo-matos-pereira-fortes-62360a228/");
  await expect(linkedIn).toHaveAttribute("rel", "noopener noreferrer");
  await expect(linkedIn).toHaveAttribute("target", "_blank");
  for (const [label, destination, section] of [
    ["See architecture & decisions", "/work/transactional-operations-platform#architecture", "#architecture"],
    ["See current limitations", "/work/endurance-coordination-bot#limitations", "#limitations"],
  ] as const) {
    await page.goto("/");
    const link = page.getByRole("link", { name: label });
    await expect(link).toHaveAttribute("href", destination);
    await link.click();
    await expect(page.locator(section)).toBeVisible();
  }
});
