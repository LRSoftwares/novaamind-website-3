import { getCollection } from 'astro:content';

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export const getSolutions = async () => (await getCollection('solutions')).sort(byOrder);
export const getIndustries = async () => (await getCollection('industries')).sort(byOrder);
export const getCategories = async () => (await getCollection('resourceCategories')).sort(byOrder);
export const getFaqs = async () => (await getCollection('faqs')).sort(byOrder);
export const getResources = async () =>
  (await getCollection('resources')).sort((a, b) =>
    a.data.category === b.data.category ? a.data.order - b.data.order : a.data.category.localeCompare(b.data.category),
  );
export const getInsights = async () =>
  (await getCollection('insights', ({ data }) => import.meta.env.DEV || !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
export const getEngagements = async () =>
  (await getCollection('engagements', ({ data }) => data.show)).sort(byOrder);
