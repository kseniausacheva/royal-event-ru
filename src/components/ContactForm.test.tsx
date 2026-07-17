import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../LanguageContext';
import ContactForm from './ContactForm';

/**
 * INTEGRATION TESTS — ContactForm
 * Tests form interactions, validation, and submission flow with a mocked fetch.
 */
const renderForm = (path = '/ru') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    </MemoryRouter>
  );

describe('ContactForm (integration)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders name, email, message fields and required checkboxes', () => {
    renderForm('/ru');
    // The form has text input, email input, and a textarea
    expect(document.querySelector('input[type="text"]')).toBeInTheDocument();
    expect(document.querySelector('input[type="email"]')).toBeInTheDocument();
    expect(document.querySelector('textarea')).toBeInTheDocument();
    // Required consent checkboxes (data-consent & offer-consent are required; mailing is optional)
    const dataConsent = document.getElementById('data-consent') as HTMLInputElement;
    const offerConsent = document.getElementById('offer-consent') as HTMLInputElement;
    const mailingConsent = document.getElementById('mailing-consent') as HTMLInputElement;
    expect(dataConsent).toBeInTheDocument();
    expect(dataConsent.required).toBe(true);
    expect(offerConsent.required).toBe(true);
    expect(mailingConsent.required).toBe(false);
  });

  it('submits the form and shows success message on 200 response', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderForm('/ru');

    // Мини-бриф: направление и формат обязательны — кликаем чипы
    await user.click(screen.getByRole('button', { name: 'Египет' }));
    await user.click(screen.getByRole('button', { name: 'Конференция' }));

    // Fill fields — inputs don't have accessible labels via htmlFor, so grab by tag.
    // Первый text-инпут — «Когда планируете» из брифа, имя — второй.
    const textInputs = document.querySelectorAll('input[type="text"]');
    const nameInput = textInputs[1] as HTMLInputElement;
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea') as HTMLTextAreaElement;

    await user.type(nameInput, 'Ksenia');
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'Hello from tests');

    (document.getElementById('data-consent') as HTMLInputElement).checked = true;
    (document.getElementById('offer-consent') as HTMLInputElement).checked = true;

    const form = document.querySelector('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    // message теперь собирается из ответов брифа + комментария
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({
      name: 'Ksenia',
      email: 'test@example.com',
      mailingConsent: false,
    });
    expect(body.message).toContain('Египет');
    expect(body.message).toContain('Конференция');
    expect(body.message).toContain('Hello from tests');

    await waitFor(() => {
      expect(screen.getByText(/заявка отправлена/i)).toBeInTheDocument();
    });
  });

  it('shows error message on network failure', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    vi.stubGlobal('fetch', fetchMock);

    renderForm('/ru');
    const form = document.querySelector('form')!;

    // Обязательные чипы брифа
    fireEvent.click(screen.getByRole('button', { name: 'Египет' }));
    fireEvent.click(screen.getByRole('button', { name: 'Конференция' }));

    // Первый text-инпут — «Когда планируете» из брифа, имя — второй
    const nameInput = document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement;
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const messageInput = document.querySelector('textarea') as HTMLTextAreaElement;
    nameInput.value = 'A';
    emailInput.value = 'a@a.com';
    messageInput.value = 'Test';
    fireEvent.input(nameInput);
    fireEvent.input(emailInput);
    fireEvent.input(messageInput);

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
    });
  });

  it('renders English labels on /en route', () => {
    renderForm('/en');
    // English consent labels — multiple checkboxes share "I give my" text
    expect(screen.getAllByText(/I give my/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/public offer/i)).toBeInTheDocument();
  });
});
