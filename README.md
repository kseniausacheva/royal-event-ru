# La Royal Event — сайт

Один репозиторий, два сайта:

| Сайт | Хостинг | Как деплоится | Команда сборки |
|---|---|---|---|
| **royaleventandmice.ru** | reg.ru (Apache, PHP) | push в `main` → GitHub Actions → FTP | `npm run build` |
| **www.royaleventandmice.com** | Vercel | push в `main` → Vercel (проект `royaleventgroup`) | `npm run build:com` |

Vite + React 19 + Tailwind 4, SSG-пререндер (`scripts/prerender.mjs`). Различия между сайтами
живут в `src/site-config.ts`, `.env` / `.env.com`, `scripts/*.mjs --target`, `vercel.json`.
Формы: на .ru — `public/contact.php`, `public/subscribe.php`; на .com — `api/contact.ts`, `api/subscribe.ts`.

## Локально

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint       # tsc
npm test           # vitest
npm run build      # сборка .ru → dist/
npm run build:com  # сборка .com → dist/
```

## Секреты (не в репозитории)

- **GitHub → Settings → Secrets and variables → Actions:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`, `EMAIL_PASS` (пароль приложения Яндекс.Почты — из него собирается `mail-config.php` при деплое).
- **Vercel → Project → Settings → Environment Variables:** `EMAIL_USER`, `EMAIL_PASS`.

## Контент

- Программы, круизы, DMC — `src/content/la-royal-event.ts`
- Блог — `src/content/blog-articles.mjs` (sitemap и пререндер подхватывают автоматически)
- Переводы интерфейса — `src/translations.ts`
- Фото круизов — `public/cruises/`, обложки программ — `public/programs/`
- Конвертация фото судов в webp ≤ 1600 px: `node scripts/convert-cruise-photos.mjs "<папка>" --list`, затем `--prefix <лодка>` (см. шапку скрипта)
