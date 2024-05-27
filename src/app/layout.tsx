import { ReactNode } from 'react';
import Script from 'next/script';
import '../app/[lang]/globals.css';
import { Metadata } from 'next';
import { getData } from '@/components/utils/fetch-api';
import { getStrapiMedia } from '@/components/utils/api-helpers';

type Props = {
  children: ReactNode;
};

const FAVICON_VERSION = '?v=1';

export async function generateMetadata({
  params,
}: {
  params: { lang: Language };
}): Promise<Metadata> {
  try {
    const response = await getData(params?.lang, '/homepage/seo');
    const metadata = response?.Seo;
    if (!metadata) return {};

    const image = metadata?.metaImage;
    return {
      metadataBase: new URL(`https://hallo.co`),
      title: {
        template: '%s | Hallo.co',
        absolute: '',
      },
      description: metadata?.metaDescription,
      keywords: metadata?.keyword,
      authors: metadata?.author,
      alternates: {
        canonical: '/',
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
            url: getStrapiMedia(image?.url || {}) || '',
          },
        ],
        type: 'website',
      },
      icons: {
        icon: {
          url: '/favicons/favicon.ico' + FAVICON_VERSION,
          sizes: '48x48',
          type: 'image/x-icon',
        },
        other: [
          {
            rel: 'apple-touch-icon',
            url: '/favicons/apple-touch-icon.png' + FAVICON_VERSION,
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            url: '/favicons/site.webmanifest' + FAVICON_VERSION,
          },
          {
            rel: 'icon',
            url: '/favicons/favicon-16x16.png' + FAVICON_VERSION,
            sizes: '16x16',
            type: 'image/x-icon',
          },
          {
            rel: 'icon',
            url: '/favicons/favicon-32x32.png' + FAVICON_VERSION,
            sizes: '32x32',
            type: 'image/x-icon',
          },
          {
            rel: 'icon',
            url: '/favicons/favicon-96x96.png' + FAVICON_VERSION,
            sizes: '96x96',
            type: 'image/x-icon',
          }
        ],
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

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
