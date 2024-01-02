import Footer from '@/components/Footer/Footer';
import { getStrapiURL } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import '@/styles/index.scss';
import { Metadata } from 'next';
import { Merriweather_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { i18n } from '../../../i18n-config';
import StoreProvider from '../GlobalRedux/StoreProvider';
import SiteHeader from './SiteHeader';
import './globals.css';

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
      // Generate favicon with https://favicon.io/ and update the version if changed
      // icons: {
      //   icon: {
      //     url: '/image/favicons/favicon.ico' + FAVICON_VERSION,
      //     sizes: '48x48',
      //     type: 'image/x-icon',
      //   },
      //   other: [
      //     {
      //       rel: 'apple-touch-icon',
      //       url: '/image/favicons/apple-touch-icon.png' + FAVICON_VERSION,
      //       sizes: '180x180',
      //     },
      //     {
      //       rel: 'manifest',
      //       url: '/image/favicons/site.webmanifest' + FAVICON_VERSION,
      //     },
      //   ],
      // },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Hallo',
      description: 'Blog and news information',
    };
  }
}

const merriweather = Merriweather_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={merriweather.className}>
      <body className="">
        <div className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
          <SiteHeader />
          <StoreProvider> {children}</StoreProvider>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
