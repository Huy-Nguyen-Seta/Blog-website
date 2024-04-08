import { Route } from '@/routers/types';
import __taxonomies from './jsons/__taxonomies.json';
import { TaxonomyType } from './types';
import useTrans from '@/hooks/useTranslate';
import { mockEng, mockJa, mockVi } from './mock';
const DEMO_CATEGORIES: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: 'category',
  href: item.href as Route,
}));

export const getMockDataCategories  = (lang: Language) => {
  if (lang === 'en') {
    return mockEng.map((item) => ({
      ...item,
      taxonomy: 'category',
      href: item.href as Route,
    }));
  } else if (lang === 'ja') {
    return mockJa.map((item) => ({
      ...item,
      taxonomy: 'category',
      href: item.href as Route,
    }));
  } else {
    return mockVi.map((item) => ({
      ...item,
      taxonomy: 'category',
      href: item.href as Route,
    }));
  }
};

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: 'tag',
  href: item.href as Route,
}));

export { DEMO_CATEGORIES, DEMO_TAGS };
