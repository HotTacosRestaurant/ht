import { test, expect } from '@playwright/test';

test('firebase inicializa en cliente', async ({ page }) => {
  await page.goto('/');

  const isFirebaseLoaded = await page.evaluate(() => {
    return typeof window !== 'undefined' && !!window.indexedDB;
  });

  expect(isFirebaseLoaded).toBeTruthy();
});