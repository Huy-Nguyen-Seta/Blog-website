import { getData } from '@/components/utils/fetch-api';
import { i18n } from '../../i18n-config';

const getEngLanguageUrl = (slug: string) => ({
  url: `${process.env.BASE_URL}/en/${slug}`,
  lastModified: new Date(),
});

const getViLanguageUrl = (slug: string) => ({
  url: `${process.env.BASE_URL}/vi/${slug}`,
  lastModified: new Date(),
});

function getLanguageUrls(slug: string) {
  return i18n.locales.map((locale) => ({
    url: `${process.env.BASE_URL}/${locale}/news/${slug}`,
    lastModified: new Date(),
  }));
}

export default async function sitemap() {
  const [newsEng, newVi, authorEn, authorVi, enCate, viCate, enTag, viTag] =
    await Promise.all([
      getData('en', '/getBLogsByQuery', {
        populate: '*',
      }),
      getData('vi', '/getBLogsByQuery', {
        populate: '*',
      }),
      getData('en', '/getAuthors', {
        populate: '*',
      }),
      getData('vi', '/getAuthors', {
        populate: '*',
      }),
      getData('en', '/getCategories', {
        populate: '*',
      }),
      getData('vi', '/getCategories', {
        populate: '*',
      }),
      getData('en', '/getTags', {
        populate: '*',
      }),
      getData('vi', '/getTags', {
        populate: '*',
      }),
    ]);

  const newsEngUrls = (newsEng?.data ?? [])
    .map((item: any) => getEngLanguageUrl(`news/single/${item?.slug}`))
    .flat();

  const newsViUrls = (newVi?.data ?? [])
    .map((item: any) => getViLanguageUrl(`news/single/${item?.slug}`))
    .flat();

  const authorEngUrls = (authorEn?.results ?? [])
    .map((item: any) => getEngLanguageUrl(`news/author/${item?.slug}`))
    .flat();

  const authorViUrl = (authorVi?.results ?? [])
    .map((item: any) => getViLanguageUrl(`news/author/${item?.slug}`))
    .flat();

  const cateEngUrls = (enCate ?? [])
    .map((item: any) => getEngLanguageUrl(`news/archive/${item?.slug}`))
    .flat();

  const cateViUrl = (viCate ?? [])
    .map((item: any) => getViLanguageUrl(`news/archive/${item?.slug}`))
    .flat();

  const tagEngUrls = (enTag ?? [])
    .map((item: any) => getEngLanguageUrl(`news/archive/tags/${item?.slug}`))
    .flat();

  const tagViUrl = (viTag ?? [])
    .map((item: any) => getViLanguageUrl(`news/archive/tags/${item?.slug}`))
    .flat();

  const urls = [
    ...getLanguageUrls(''),
    ...getLanguageUrls('search'),
    ...newsEngUrls,
    ...newsViUrls,
    ...authorEngUrls,
    ...authorViUrl,
    ...cateEngUrls,
    ...cateViUrl,
    ...tagEngUrls,
    ...tagViUrl,
  ];

  return urls;
}
