import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';

/**
 * Real-browser E2E — Contact form
 * Full user scenario: visit contact page, fill form, submit with mocked backend,
 * and see success screen. Network is intercepted so we don't actually send email.
 *
 * Форма начинается с мини-брифа: чипы «Куда» и «Формат» обязательны,
 * первый text-инпут — «Когда планируете», имя — второй.
 */

const fillBrief = async (form: Locator) => {
  await form.getByRole('button', { name: 'Египет', exact: true }).click();
  await form.getByRole('button', { name: 'Конференция', exact: true }).click();
};

const fillContacts = async (form: Locator, name: string, email: string) => {
  await form.locator('input[type="text"]').nth(1).fill(name);
  await form.locator('input[type="email"]').fill(email);
  await form.locator('input[type="tel"]').fill('+79990001122');
  await form.locator('select').selectOption('Telegram');
};

test.describe('Contact form', () => {
  test('user fills and submits the contact form successfully', async ({ page }) => {
    // Intercept backend call
    await page.route('**/api/contact', async (route) => {
      const request = route.request();
      const body = request.postDataJSON();
      expect(body).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
        message: expect.any(String),
      });
      // message собирается из ответов брифа
      expect(body.message).toContain('Египет');
      expect(body.message).toContain('Конференция');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/ru/contact');

    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    await fillBrief(form);
    await fillContacts(form, 'Ксения Тест', 'test@example.com');
    await form.locator('textarea').fill('Хочу организовать корпоративный выезд в Египет');

    // Required consent checkboxes
    await page.locator('#data-consent').check();
    await page.locator('#offer-consent').check();

    // Submit
    await form.getByRole('button', { name: /отправить/i }).click();

    // Success screen
    await expect(page.getByText(/заявка отправлена/i)).toBeVisible({ timeout: 5000 });
  });

  test('shows error state when backend returns 500', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      })
    );

    await page.goto('/ru/contact');
    const form = page.locator('form').first();
    await fillBrief(form);
    await fillContacts(form, 'Test', 'test@example.com');
    await page.locator('#data-consent').check();
    await page.locator('#offer-consent').check();
    await form.getByRole('button', { name: /отправить/i }).click();

    // Error message should appear, success screen should NOT
    await expect(page.getByText(/заявка отправлена/i)).toBeHidden();
  });

  test('cannot submit without required consent checkboxes (HTML5 validation)', async ({ page }) => {
    let requestMade = false;
    await page.route('**/api/contact', async (route) => {
      requestMade = true;
      await route.fulfill({ status: 200, body: '{}' });
    });

    await page.goto('/ru/contact');
    const form = page.locator('form').first();
    await fillBrief(form);
    await fillContacts(form, 'Test', 'test@example.com');
    // Intentionally skip required checkboxes
    await form.getByRole('button', { name: /отправить/i }).click();

    // Give it a moment — request should not happen due to HTML5 required
    await page.waitForTimeout(500);
    expect(requestMade).toBe(false);
  });

  test('brief chips are required — no request without them', async ({ page }) => {
    let requestMade = false;
    await page.route('**/api/contact', async (route) => {
      requestMade = true;
      await route.fulfill({ status: 200, body: '{}' });
    });

    await page.goto('/ru/contact');
    const form = page.locator('form').first();
    // Заполняем всё, КРОМЕ чипов брифа
    await fillContacts(form, 'Test', 'test@example.com');
    await page.locator('#data-consent').check();
    await page.locator('#offer-consent').check();
    await form.getByRole('button', { name: /отправить/i }).click();

    // JS-валидация брифа должна остановить отправку и показать подсказку
    await expect(page.getByText(/выберите направление и формат/i)).toBeVisible();
    await page.waitForTimeout(300);
    expect(requestMade).toBe(false);
  });
});
