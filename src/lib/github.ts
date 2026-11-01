/**
 * Реальная активность с GitHub для виджета на рабочем столе.
 * Берётся при сборке сайта с публичной страницы профиля, ключи не нужны.
 * Если GitHub недоступен (например, локально без интернета) — возвращает null,
 * и виджет просто не показывается.
 */
export interface Activity {
  total: number;
  /** Уровни 0–4 по дням, сгруппированные по неделям (последние N недель) */
  weeks: number[][];
  from: Date;
  to: Date;
}

const cache = new Map<string, Promise<Activity | null>>();

export function getActivity(user: string, weeks = 22): Promise<Activity | null> {
  const key = `${user}:${weeks}`;
  if (!cache.has(key)) cache.set(key, load(user, weeks));
  return cache.get(key)!;
}

async function load(user: string, weeksCount: number): Promise<Activity | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { 'User-Agent': 'portfolio-build' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = await res.text();

    const days: { date: string; level: number }[] = [];
    for (const m of html.matchAll(/<td\b[^>]*>/g)) {
      const tag = m[0];
      const date = tag.match(/data-date="(\d{4}-\d{2}-\d{2})"/)?.[1];
      const level = tag.match(/data-level="(\d)"/)?.[1];
      if (date && level !== undefined) days.push({ date, level: Number(level) });
    }
    if (days.length === 0) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));

    // Обрезаем до целых недель с конца
    const recent = days.slice(-weeksCount * 7);
    const weeks: number[][] = [];
    for (let i = 0; i < recent.length; i += 7) weeks.push(recent.slice(i, i + 7).map((d) => d.level));

    const totalMatch = html.match(/([\d,\s]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
    const total = totalMatch ? Number(totalMatch[1].replace(/[^\d]/g, '')) : 0;

    return {
      total,
      weeks,
      from: new Date(recent[0].date),
      to: new Date(recent[recent.length - 1].date),
    };
  } catch {
    return null;
  }
}
