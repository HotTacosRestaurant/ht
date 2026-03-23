import { test, expect } from '@playwright/test';

test.describe('Flujo completo Hot Tacos', () => {

  test('usuario puede ver home y ordenar', async ({ page }) => {

    // 📱 modo mobile
    await page.setViewportSize({ width: 375, height: 812 });

    // 1. abrir app
    await page.goto('/');

    // 2. verificar título
    await expect(page).toHaveTitle(/Hot Tacos/i);

    // 3. verificar botón ordenar visible
    const ordenar = page.getByRole('link', { name: /ordenar/i }).first();
    await expect(ordenar).toBeVisible();

    // 4. click ordenar
    await Promise.all([
      page.waitForURL(/locations/),
      ordenar.click(),
    ]);

    // 5. validar que navega o abre algo
    await expect(page).toHaveURL(/locations/);
    await expect(page.locator("main")).toContainText(/sucursal/i);

  });

});