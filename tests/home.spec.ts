import { test, expect } from '@playwright/test';

test('homepage carga correctamente', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Hot Tacos/i);
});

test('botón Ordenar es visible en mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto('/');

  const ordenar = page.getByRole('link', { name: /^ordenar$/i }).first();

  await expect(ordenar).toBeVisible();
});