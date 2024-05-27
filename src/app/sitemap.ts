import { getData } from '@/components/utils/fetch-api';
import { i18n } from '../../i18n-config';

const getEngLanguageUrl = (slug: string) => ({
  url: `https://hallo.co/en/${slug}`,
  lastModified: new Date(),
});

const getViLanguageUrl = (slug: string) => ({
  url: `https://hallo.co/vi/${slug}`,
  lastModified: new Date(),
});

const getJaLanguageUrl = (slug: string) => ({
  url: `https://hallo.co/ja/${slug}`,
  lastModified: new Date(),
});

function getLanguageUrls(slug: string) {
  return i18n.locales.map((locale) => ({
    url: `https://hallo.co/${locale}/news/${slug}`,
    lastModified: new Date(),
  }));
}

export default async function sitemap() {
  const [
    newsEng,
    newVi,
    newJa,
    authorEn,
    authorVi,
    authorJa,
    enCate,
    viCate,
    jaCate,
    enTag,
    viTag,
    jaTag,
    enPartner,
    viPartner,
    jaPartner,
  ] = await Promise.all([
    getData('en', '/getBLogsByQuery', {
      populate: '*',
    }),
    getData('vi', '/getBLogsByQuery', {
      populate: '*',
    }),
    getData('ja', '/getBLogsByQuery', {
      populate: '*',
    }),
    getData('en', '/getAuthors', {
      populate: '*',
    }),
    getData('vi', '/getAuthors', {
      populate: '*',
    }),
    getData('ja', '/getAuthors', {
      populate: '*',
    }),
    getData('en', '/getCategories', {
      populate: '*',
    }),
    getData('vi', '/getCategories', {
      populate: '*',
    }),
    getData('ja', '/getCategories', {
      populate: '*',
    }),
    getData('en', '/getTags', {
      populate: '*',
    }),
    getData('vi', '/getTags', {
      populate: '*',
    }),
    getData('ja', '/getTags', {
      populate: '*',
    }),
    getData('en', '/getPartners', { populate: '*' }),
    getData('vi', '/getPartners', { populate: '*' }),
    getData('ja', '/getPartners', { populate: '*' }),
  ]);

  const newsEngUrls = (newsEng?.data ?? [])
    .map((item: any) => getEngLanguageUrl(`news/${item?.slug}`))
    .flat();

  const newsViUrls = (newVi?.data ?? [])
    .map((item: any) => getViLanguageUrl(`news/${item?.slug}`))
    .flat();

  const newJaUrls = (newJa?.data ?? [])
    .map((item: any) => getJaLanguageUrl(`news/${item?.slug}`))
    .flat();

  const authorEngUrls = (authorEn?.results ?? [])
    .map((item: any) => getEngLanguageUrl(`news/author/${item?.slug}`))
    .flat();

  const authorViUrl = (authorVi?.results ?? [])
    .map((item: any) => getViLanguageUrl(`news/author/${item?.slug}`))
    .flat();

  const authorJaUrl = (authorJa?.results ?? [])
    .map((item: any) => getJaLanguageUrl(`news/author/${item?.slug}`))
    .flat();

  const cateEngUrls = (enCate ?? [])
    .map((item: any) => getEngLanguageUrl(`news/archive/${item?.slug}`))
    .flat();

  const cateViUrl = (viCate ?? [])
    .map((item: any) => getViLanguageUrl(`news/archive/${item?.slug}`))
    .flat();

  const cateJaUrl = (jaCate ?? [])
    .map((item: any) => getJaLanguageUrl(`news/archive/${item?.slug}`))
    .flat();

  const tagEngUrls = (enTag ?? [])
    .map((item: any) => getEngLanguageUrl(`news/archive/tags/${item?.slug}`))
    .flat();

  const tagViUrl = (viTag ?? [])
    .map((item: any) => getViLanguageUrl(`news/archive/tags/${item?.slug}`))
    .flat();

  const tagJaUrl = (jaTag ?? [])
    .map((item: any) => getJaLanguageUrl(`news/archive/tags/${item?.slug}`))
    .flat();

  const partnerEnUrl = (enPartner?.data ?? [])
    .map((item: any) => getEngLanguageUrl(`news/partner/${item?.slug}`))
    .flat();

  const partnerViUrl = (viPartner?.data ?? [])
    .map((item: any) => getViLanguageUrl(`news/archive/tags/${item?.slug}`))
    .flat();

  const partnerJaUrl = (jaPartner?.data ?? [])
    .map((item: any) => getJaLanguageUrl(`news/archive/tags/${item?.slug}`))
    .flat();
  const urls = [
    { url: `https://hallo.co`, lastModified: new Date() },
    { url: `https://hallo.co/news`, lastModified: new Date() },
    ...getLanguageUrls(''),
    ...getLanguageUrls('search'),
    ...newsEngUrls,
    ...newsViUrls,
    ...newJaUrls,
    ...authorEngUrls,
    ...authorViUrl,
    ...authorJaUrl,
    ...cateEngUrls,
    ...cateViUrl,
    ...cateJaUrl,
    ...tagEngUrls,
    ...tagViUrl,
    ...tagJaUrl,
    ...partnerEnUrl,
    ...partnerViUrl,
    ...partnerJaUrl,
  ];

  return urls;
}
