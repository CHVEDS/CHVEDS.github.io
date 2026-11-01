/**
 * ЕДИНЫЙ ФАЙЛ НАСТРОЕК САЙТА.
 * Все тексты рабочего стола, контакты, меню и направления проектов — здесь.
 * Строки с пометкой TODO нужно заполнить своими данными.
 */

export const site = {
  /** Имя, как оно будет на сайте */
  name: 'Вадим Чураев',
  /** Ник — в логотипе ~/heres и в терминале */
  handle: 'heres',
  /** Роль одной строкой — для заголовков страниц и поисковиков */
  role: 'Python‑разработчик · ИИ‑системы на локальных моделях',
  /** Описание для поисковиков и превью ссылок (до ~160 символов) */
  description:
    'Вадим Чураев — Python‑разработчик: ИИ‑системы на локальных моделях (LLM‑шлюз, RAG, агенты), сервисы, боты и автоматизация. Довожу идеи до работающего продукта.',
  location: 'Москва', // TODO: + формат работы, например «Москва · удалённо или гибрид»
  /** Плашка «открыт к работе» в верхнем меню */
  openToWork: true,
  locale: 'ru-RU',
  lang: 'ru',
} as const;

/** Контакты. Пустые строки не отображаются. */
export const contacts = {
  email: '', // TODO: публичная почта
  telegram: '', // TODO: ник без @
  github: 'CHVEDS',
  hh: '', // ссылка на резюме hh.ru
  habr: '', // ник на Хабр Карьере
  /** Файл резюме в папке public/ (например, '/resume.pdf'). Пусто — иконка не показывается */
  resume: '',
} as const;

/** Пункты верхнего меню */
export const nav = [
  { href: '/projects', label: 'Проекты' },
  { href: '/lab', label: 'Лаборатория' },
  { href: '/about', label: 'Обо мне' },
] as const;

/* ─────────────────────────── Главная: рабочий стол ─────────────────────────── */

export const desktop = {
  /** Серая строка-комментарий над приветствием */
  tagline: 'python · local llm · rag · agents',
  greeting: 'Привет, я Вадим 👋',
  /** Главный заголовок. Слова в *звёздочках* подчёркиваются красным, \n — перенос строки */
  headline: 'Беру идею.\nВозвращаю *работающий продукт*.',
  /** Абзац под заголовком */
  lead: 'Python‑разработчик, строю ИИ‑системы на локальных моделях. Автор Inopia — платформы из LLM‑шлюза, базы знаний и агента поддержки, которая целиком работает в закрытом контуре. Технический директор Tandemind. Проектирую, пишу, тестирую и запускаю — под ключ.',

  /** Терминал: строки печатаются по очереди. cmd — команда, log — строка вывода */
  terminal: {
    title: 'zsh — ~/heres',
    lines: [
      { type: 'cmd', text: 'cat highlights.txt' },
      { type: 'out', text: 'Inopia: ИИ‑платформа на локальных моделях — шлюз, RAG, агент' },
      { type: 'out', text: 'Qwen 2.5 7B + bge‑m3 на RTX 3060: 0 утечек, 25/25 порогов в CI' },
      { type: 'out', text: 'технический директор Tandemind — мультиагентная платформа обучения' },
      { type: 'out', text: 'хакатон Интер РАО: ИБ‑ассистент, 84 источника, 111 тестов' },
      { type: 'out', text: 'студент РЭУ им. Плеханова, информационная безопасность' },
    ],
  },

  /** Стикер «Сейчас в работе» */
  todo: [
    { done: true, text: 'Inopia: живой прогон' },
    { done: true, text: 'кейсы в портфолио' },
    { done: false, text: 'публикация сайта' },
    { done: false, text: 'мини‑проекты в lab/' },
  ], // TODO: актуальные планы

  /** Виджет активности: реальная статистика с GitHub, подтягивается при сборке сайта */
  activity: {
    enabled: true,
    githubUser: 'CHVEDS',
    weeks: 22,
  },
} as const;

/* ─────────────────────────────── Проекты ─────────────────────────────── */

/**
 * Направления проектов. Ключ используется в файлах проектов (category: ai).
 * folder — цвет папки: light (белая), red (красная), gray (серая).
 */
export const categories = {
  ai: { label: 'ИИ и агенты', folder: 'light' },
  automation: { label: 'Автоматизация', folder: 'red' },
  bots: { label: 'Боты', folder: 'red' },
  web: { label: 'Веб', folder: 'light' },
  security: { label: 'Кибербезопасность', folder: 'gray' },
  other: { label: 'Другое', folder: 'gray' },
} as const;

export type CategoryKey = keyof typeof categories;
export type FolderColor = 'light' | 'red' | 'gray';
export const categoryKeys = Object.keys(categories) as [CategoryKey, ...CategoryKey[]];

export const statuses = {
  done: 'Готов',
  wip: 'В работе',
  archived: 'Архив',
} as const;

export type StatusKey = keyof typeof statuses;
export const statusKeys = Object.keys(statuses) as [StatusKey, ...StatusKey[]];

/** Навыки — страница «Обо мне» */
export const skills = [
  { title: 'Локальные LLM', items: ['Ollama', 'Qwen 2.5', 'bge‑m3', '4‑битная квантизация'] },
  { title: 'ИИ‑системы', items: ['RAG', 'гибридный поиск', 'Агенты', 'MCP', 'Evals', 'LLM‑шлюз'] },
  { title: 'Бэкенд', items: ['Python', 'FastAPI', 'PostgreSQL + pgvector', 'Redis', 'Docker Compose', 'GitHub Actions'] },
  { title: 'Автоматизация и боты', items: ['n8n', 'aiogram', 'Telegram / MAX API', 'GigaChat', 'YandexGPT'] },
  { title: 'Фронтенд', items: ['React', 'TypeScript', 'Streamlit', 'Astro'] },
  { title: 'Безопасность', items: ['Информационная безопасность', 'CTF', 'Форензика', 'Реверс'] },
] as const;
