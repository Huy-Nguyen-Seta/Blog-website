// Tag and category have same data type - we will use one demo data

import { getStrapiURL } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import { Metadata } from 'next';
import { PageArchive } from './PageArchive';

export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string[] };
}): Promise<Metadata> {
  try {
    const isTag = params?.slug[0] === 'tags';
    const currentSlug = !isTag
      ? params?.slug?.join('/')
      : params?.slug?.slice(1)?.join('/');
    const response = await getData(
      params?.lang,
      `/${isTag ? 'findTagSeoBySlug' : 'findCateSeoBySlug'}/${currentSlug}`
    );
    const metadata = response?.metaData;
    if (!metadata) return {};

    const image = metadata?.metaImage?.url;

    return {
      title: metadata?.metaTitle,
      description: metadata?.metaDescription,
      keywords: metadata?.keyword,
      authors: metadata?.author,
      alternates: {
        canonical: `/news/archive/${isTag ? 'tags/' : ''}${currentSlug}`,
        languages: {
          'en-US': '/en',
          'ja-JP': '/ja',
          'vi-VN': '/vi',
        },
      },
      openGraph: {
        title: metadata?.metaTitle,
        description: metadata?.metaDescription,
        url: '/',
        siteName: 'Hallo',
        images: [
          {
            url: getStrapiURL(image),
          },
        ],
        type: 'website',
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Hallo',
      description: 'Blog and news information',
    };
  }
}

const PageArchives = async ({
  params,
}: {
  params: { lang: Language; slug: string[] };
}) => {
  const isTag = params?.slug[0] === 'tags';
  const currentSlug = !isTag
    ? params?.slug?.join('/')
    : params?.slug?.slice(1)?.join('/');
  const responseSeo = await getData(
    params?.lang,
    `/${isTag ? 'findTagSeoBySlug' : 'findCateSeoBySlug'}/${currentSlug}`
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(responseSeo?.metaData?.schema || {}),
        }}
      />
      <PageArchive params={params} />
    </>
  );
};

export default PageArchives;

export async function generateStaticParams({
  params,
}: {
  params: { lang: Language };
}) {
  const responseCates = await getData(params?.lang, '/getCategories', {
    populate: '*',
  });
  const responseTags = await getData(params?.lang, '/getTags', {
    populate: '*',
  });
  const slugsCate =
    responseCates
      ?.map((item: any) => ({
        slug: [item?.slug],
      }))
      ?.filter((item: any) => item.slug) || [];
  const slugTags =
    responseTags
      ?.map((item: any) => ({
        slug: ['tags', item?.slug],
      }))
      ?.filter((item: any) => item.slug) || [];
  return slugTags?.concat(slugsCate);
}

export const dynamicParams = false;
export const dynamic = 'force-dynamic';
