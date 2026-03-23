import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3010',
    headless: true,
    video: 'retain-on-failure',
  },
});