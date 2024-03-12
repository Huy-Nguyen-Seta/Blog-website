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
      metadataBase: new URL(`${process.env.BASE_URL}`),
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
        icon: [
          {
            url: '/favicons/favicon-16x16.png' + FAVICON_VERSION,
            sizes: '16x16',
            type: 'image/png',
          },
          {
            url: '/favicons/favicon-32x32.png' + FAVICON_VERSION,
            sizes: '32x32',
            type: 'image/png',
          },
          {
            url: '/favicons/favicon-48x48.png' + FAVICON_VERSION,
            sizes: '48x48',
            type: 'image/png',
          },
          {
            url: '/favicons/favicon.ico' + FAVICON_VERSION,
            sizes: '48x48',
            type: 'image/x-icon',
          },
        ],
        other: [
          {
            rel: 'apple-touch-icon',
            url: '/favicons/apple-touch-icon.png' + FAVICON_VERSION,
            sizes: '180x180',
          },
        ],
      },
      manifest: '/site.webmanifest' + FAVICON_VERSION,
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
      <Script strategy="lazyOnload" async id="facebook">
        {`
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "274161719106282");
            chatbox.setAttribute("attribution", "biz_inbox");
      
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v12.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>
    </html>
  );
}
