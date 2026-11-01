import { getCollection, type CollectionEntry } from 'astro:content';

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const items = await getCollection('projects', visible);
  // Сначала по ручному порядку (order), затем по дате — лучшие работы видны первыми
  return items.sort((a, b) => a.data.order - b.data.order || b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getFeaturedProjects(limit = 4) {
  const items = (await getProjects()).filter((p) => p.data.featured);
  return items.sort((a, b) => a.data.order - b.data.order).slice(0, limit);
}

export async function getLabItems(): Promise<CollectionEntry<'lab'>[]> {
  const items = await getCollection('lab', visible);
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
