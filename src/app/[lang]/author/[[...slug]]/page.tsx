import { getStrapiURL } from '@/components/utils/api-helpers';
import { PageAuthors } from './PageAuthors';
import { getData } from '@/components/utils/fetch-api';
import { Metadata } from 'next';

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
      `/findAuthorSeoBySlug/${currentSlug}`
    );
    const metadata = response?.metaData;
    if (!metadata) return {};

    const image = metadata?.metaImage?.url;

    return {
      title: metadata?.metaTitle,
      description: metadata?.metaDescription,
      keywords: metadata?.keyword,
      alternates: {
        canonical: '/',
        languages: {
          'en-US': '/en',
          'ja-JP': '/ja',
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

const PageAuthor = ({
  params,
}: {
  params: { lang: Language; slug: string[] };
}) => {
  return (
    <>
      <PageAuthors params={params} />
    </>
  );
};

export default PageAuthor;
