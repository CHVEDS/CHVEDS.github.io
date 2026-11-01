import { site } from '@/config/site';

/** Ссылка с учётом base (нужно, если сайт живёт не в корне домена) */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/** Активен ли пункт меню */
export function isActive(href: string, pathname: string): boolean {
  const current = pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '') || '/';
  if (href === '/') return current === '/' || current === '';
  return current === href || current.startsWith(`${href}/`);
}

const monthYear = new Intl.DateTimeFormat(site.locale, { month: 'long', year: 'numeric' });
export const formatMonth = (d: Date) => monthYear.format(d).replace(/\s?г\.$/, '');
export const formatYear = (d: Date) => String(d.getFullYear());

/** Превращает «текст *акцент* текст» в HTML с подчёркиванием акцентных слов */
export function markup(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\*(.+?)\*/g, '<em class="mark">$1</em>').replace(/\n/g, '<br />');
}
