import { getStrapiMedia, getStrapiURL } from '@/components/utils/api-helpers';
import { PageAuthors } from './PageAuthors';
import { getData } from '@/components/utils/fetch-api';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string };
}): Promise<Metadata> {
  try {
    const response = await getData(
      params?.lang,
      `/findAuthorSeoBySlug/${params?.slug}`
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
        canonical: `/news/author/${params?.slug}`,
        languages: {
          'en-US': '/en',
          'ja-JP': '/ja',
          'vi-VN': '/vi'
        },
      },
      openGraph: {
        title: metadata?.metaTitle,
        description: metadata?.metaDescription,
        url: '/',
        siteName: 'Hallo',
        images: [
          {
            url: getStrapiMedia(image) || '',
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

const PageAuthor = async ({
  params,
}: {
  params: { lang: Language; slug: string };
}) => {
  const responseSeo = await getData(
    params?.lang,
    `/findAuthorSeoBySlug/${params?.slug}`
  );

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(responseSeo?.metaData?.schema || {}),
        }}
      />
      <PageAuthors params={params} />
    </section>
  );
};

export default PageAuthor;

export async function generateStaticParams({
  params,
}: {
  params: { lang: Language };
}) {
  const response = await getData(params?.lang, '/getAuthors', {
    populate: '*',
  });
  return (
    response?.results
      ?.map((item: any) => ({
        slug: item?.slug,
      }))
      ?.filter((item: any) => item.slug) || []
  );
}

export const dynamicParams = false;
export const dynamic = 'force-dynamic';
