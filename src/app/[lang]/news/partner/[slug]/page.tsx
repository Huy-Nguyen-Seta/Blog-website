import { getStrapiMedia } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Content from './Content';
export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string };
}): Promise<Metadata> {
  try {
    const response = await getData(
      params?.lang,
      `/findPartnerSeoBySlug/${params?.slug}`
    );
    const metadata = response?.attributes?.meta;
    if (!metadata) return {};

    const image =
      metadata?.metaImage?.url || metadata?.metaImage?.data?.attributes?.url;

    return {
      title: metadata?.metaTitle,
      description: metadata?.metaDescription,
      keywords: metadata?.keyword,
      authors: metadata?.author,
      alternates: {
        canonical: `/news/partner/${params?.slug}`,
        languages: {
          'vi-VN': '/vi',
          'ja-JP': '/ja',    
          'en-US': '/en',
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
const PageSingle = async ({
  params,
}: {
  params: { lang: Language; slug: string };
}) => {
  const response = await getData(
    params?.lang,
    `/findPartnerBySlug/${params?.slug}`,
    null,
    true
  );

  if (!response) {
    notFound();
  }

  const responseSeo = await getData(
    params?.lang,
    `/findPartnerSeoBySlug/${params?.slug}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(responseSeo?.attributes?.meta?.schema || {}),
        }}
      />
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <Content
          response={response}
        />
      </div>
    </>
  );
};

export default PageSingle;

export async function generateStaticParams({
  params,
}: {
  params: { lang: Language; slug: string };
}) {
  const response = await getData(params?.lang, '/getPartners', {
    populate: '*',
  });
  return (
    response?.data
      ?.map((item: any) => ({
        slug: encodeURI(item?.slug),
      }))
      ?.filter((item: any) => item.slug) || []
  );
}
export const dynamicParams = false;
export const dynamic = 'force-dynamic';
