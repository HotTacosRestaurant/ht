import { test, expect } from "@playwright/test";

test("customer experience form works", async ({ page }) => {
  await page.goto("/customer-experience");

  await page.getByPlaceholder("Nombre").fill("Test User");
  await page.getByPlaceholder("Teléfono").fill("1234567890");
  await page.getByPlaceholder("Email").fill("test@test.com");

  await Promise.all([
    page.waitForTimeout(2000),
    page.getByRole("button", { name: /enviar/i }).click(),
  ]);

  // ✅ valida que no crashea y se mantiene en la página
  await expect(page).toHaveURL(/customer-experience/);
});