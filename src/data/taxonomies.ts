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
  let data : TaxonomyType[]

  if (lang === 'en') {
    data = mockEng.map((item) => ({
      ...item,
      taxonomy: 'category',
      href: item.href as Route,
    }));
  } else if (lang === 'ja') {
    data = mockJa.map((item) => ({
      ...item,
      taxonomy: 'category',
      href: item.href as Route,
    }));
  } else {
    data = mockVi.map((item) => ({
      ...item,
      taxonomy: 'category',
      href: item.href as Route,
    }));
  }
  return data;
};

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: 'tag',
  href: item.href as Route,
}));

export { DEMO_CATEGORIES, DEMO_TAGS };
