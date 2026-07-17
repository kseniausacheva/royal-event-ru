import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config — real-browser E2E tests.
 *
 * Дев-сервер поднимается на ВЫДЕЛЕННОМ порту 5273 (не дефолтном 5173):
 * на 5173 часто висит dev-сервер другого проекта, и с reuseExistingServer
 * тесты прогонялись против чужого сайта (все падали «страница не та»).
 * Переопределить: PW_PORT=XXXX npx playwright test.
 *
 * To run:
 *   npm run test:e2e:browser            (headless)
 *   npm run test:e2e:browser -- --ui    (interactive UI mode)
 *   npm run test:e2e:browser -- --headed (see the browser window)
 */
const PORT = Number(process.env.PW_PORT || 5273);

export default defineConfig({
  testDir: './e2e',
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'ru-RU',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to test more browsers:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    // vite.config читает PORT из env — сервер поднимется на нашем порту
    command: 'npm run dev',
    env: { PORT: String(PORT) },
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
