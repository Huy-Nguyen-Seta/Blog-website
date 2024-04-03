import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox/SectionGridCategoryBox';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
import SectionMagazine1 from '@/components/Sections/SectionMagazine1';
import SectionMagazine2 from '@/components/Sections/SectionMagazine2';
import SectionMagazine9 from '@/components/Sections/SectionMagazine9';
import SectionSliderPosts from '@/components/Sections/SectionSliderPosts';
import { getStrapiMedia, getStrapiURL } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import { DEMO_POSTS, DEMO_POSTS_AUDIO } from '@/data/posts';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { translateLanguage } from '@/utils/translateLanguage';
import { Metadata } from 'next';
const FAVICON_VERSION = '?v=1';

//
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//
export async function generateMetadata({
  params,
}: {
  params: { lang: Language };
}): Promise<Metadata> {
  try {
    const response = await getData(params?.lang, '/homepage/seo');
    const metadata = response?.Seo;
    if (!metadata) return {};

    const image = metadata?.metaImage?.url;

    return {
      title: metadata?.metaTitle,
      description: metadata?.metaDescription,
      keywords: metadata?.keyword,
      authors: metadata?.author,
      alternates: {
        canonical: '/news',
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

const PageHome = async ({
  params,
}: {
  params: { lang: Language; slug: string };
}) => {
  const responseSeo = await getData(params?.lang, '/homepage/seo');

  const response = await getData(params?.lang, '/homepage/data');
  const postByCategory = await getData(params?.lang, '/homepage/postByCate');
  const filterCategories = [{ id: 0, name: translateLanguage('All', params?.lang) }];
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(responseSeo?.Seo?.schema || {}),
        }}
      />
      <div className="nc-PageHome relative">
        <div className="container relative">
          <SectionMagazine2
            className="pt-10 pb-4 lg:py-16"
            posts={MAGAZINE2_POSTS}
            categories={filterCategories.concat(response?.NewPost?.categories)}
            lang={params?.lang}
          />
          <div className="pt-10 pb-4 lg:py-0">
            <SectionGridCategoryBox
              categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            />
          </div>

          <SectionMagazine1
            lang={params?.lang}
            heading={response?.PopularPost?.title}
            desc={response?.PopularPost?.description}
            className="py-10 lg:py-16"
            posts={response?.PopularPost?.data}
          />
          <div className="relative py-10 lg:py-16">
            <BackgroundSection />
            <SectionMagazine9
              heading={response?.Section1?.title}
              desc={response?.Section1?.description}
              posts={response?.Section1?.tagPost}
              cate={response?.Section1?.category}
              lang={params?.lang}
            />
          </div>
          {(postByCategory?.PostByCategory || [])?.map((item: any) => (
            <div className="relative py-10 lg:py-16" key={item?.id}>
              <BackgroundSection />
              <SectionSliderPosts
                postCardName="card11"
                heading={item?.title}
                subHeading={
                  item?.description ||
                  `${translateLanguage('explore_more', params?.lang)} ${item?.category?.blogs?.length || 0} ${translateLanguage('topic', params?.lang)}`
                }
                posts={item?.category?.blogs || []}
                cate={item?.category}
                lang={params?.lang}
              />
            </div>
          ))}
          <SectionSubscribe2 />

          <SectionSliderNewCategories
            className="py-10 lg:py-16"
            heading={translateLanguage('forum', params?.lang)}
            subHeading={`${translateLanguage('explore_more', params?.lang)} 233 ${translateLanguage('topic', params?.lang)}`}
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            categoryCardType="card4"
          />
        </div>
      </div>
    </section>
  );
};

export default PageHome;
