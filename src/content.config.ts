import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryKeys, statusKeys } from './config/site';

/** Ссылки проекта — всё необязательно */
const links = z
  .object({
    repo: z.url().optional(),
    demo: z.url().optional(),
    video: z.url().optional(),
    docs: z.url().optional(),
  })
  .nullish()
  .transform((v) => v ?? {});

/**
 * ПРОЕКТЫ. Один проект = одна папка в src/content/projects/<slug>/
 * с файлом index.md и картинками рядом. Файлы и папки, начинающиеся с «_», игнорируются (там лежит шаблон).
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: ['**/*.{md,mdx}', '!**/_*/**', '!**/_*.{md,mdx}'] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** 1–2 предложения для карточки */
      summary: z.string().max(220),
      /** Дата завершения / последнего релиза — по ней сортировка */
      date: z.coerce.date(),
      category: z.enum(categoryKeys),
      stack: z.array(z.string()).default([]),
      status: z.enum(statusKeys).default('done'),
      /** Роль в проекте — обязательно для командных */
      role: z.string().optional(),
      team: z.string().optional(),
      /** Показывать на главной */
      featured: z.boolean().default(false),
      /** Ручной порядок на главной: меньше — выше */
      order: z.number().default(100),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      links,
      /** Ключевые цифры: [{ value: '84', label: 'источника' }] */
      metrics: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .nullish()
        .transform((v) => v ?? []),
      /** Черновик: виден при локальном запуске, не попадает на сайт */
      draft: z.boolean().default(false),
    }),
});

/** ЛАБОРАТОРИЯ — мини-проекты, написанные специально для портфолио */
const lab = defineCollection({
  loader: glob({ base: './src/content/lab', pattern: ['**/*.{md,mdx}', '!**/_*/**', '!**/_*.{md,mdx}'] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(220),
      date: z.coerce.date(),
      stack: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      links,
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, lab };
