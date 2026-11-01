// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ─── Адрес сайта ────────────────────────────────────────────────────────────
// Репозиторий называется CHVEDS.github.io  → SITE = 'https://chveds.github.io', BASE = '/'
// Репозиторий с другим именем (например, portfolio) → BASE = '/portfolio'
// Свой домен → SITE = 'https://твой-домен.ru', BASE = '/', плюс файл public/CNAME
const SITE = process.env.SITE_URL ?? 'https://chveds.github.io';
const BASE = process.env.BASE_PATH ?? '/';

/**
 * Убирает HTML-комментарии (<!-- TODO … -->) из готовых страниц после сборки:
 * в исходниках заметки остаются, на опубликованный сайт не попадают.
 */
/** @returns {import('astro').AstroIntegration} */
function stripHtmlComments() {
  return {
    name: 'strip-html-comments',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const { readdir, readFile, writeFile } = await import('node:fs/promises');
        const { join } = await import('node:path');
        const { fileURLToPath } = await import('node:url');
        /** @param {string} d */
        const walk = async (d) => {
          for (const e of await readdir(d, { withFileTypes: true })) {
            const p = join(d, e.name);
            if (e.isDirectory()) await walk(p);
            else if (e.name.endsWith('.html')) {
              const html = await readFile(p, 'utf8');
              const clean = html.replace(/<!--[\s\S]*?-->/g, '');
              if (clean !== html) await writeFile(p, clean);
            }
          }
        };
        await walk(fileURLToPath(dir));
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  integrations: [sitemap(), stripHtmlComments()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
});
