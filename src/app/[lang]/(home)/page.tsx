import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionMagazine1 from '@/components/Sections/SectionMagazine1';
import SectionMagazine2 from '@/components/Sections/SectionMagazine2';
import SectionMagazine9 from '@/components/Sections/SectionMagazine9';
import SectionSliderPosts from '@/components/Sections/SectionSliderPosts';
import { getStrapiURL } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import { DEMO_POSTS, DEMO_POSTS_AUDIO } from '@/data/posts';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { Metadata } from 'next';

//
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//
export async function generateMetadata({
  params,
}: {
  params: { lang: Language };
}): Promise<Metadata> {
  try {
    const response = await getData(params?.lang, '/homepage/data');
    const metadata = response?.Seo;
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

const PageHome = async ({
  params,
}: {
  params: { lang: string; slug: string };
}) => {
  const response = await getData(params?.lang, '/homepage/data');
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(response?.Seo?.schema),
        }}
      />
      <div className="nc-PageHome relative">
        <div className="container relative">
          <SectionMagazine2
            className="py-16 lg:py-24"
            posts={MAGAZINE2_POSTS}
          />
          <SectionMagazine1
            heading="Tin nổỉ bật 🎨 "
            className="py-16 lg:py-28"
            posts={response?.PopularPost?.data}
          />
          <div className="relative py-16">
            <BackgroundSection />
            <SectionMagazine9
              posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 15)}
            />
          </div>

          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card11"
              heading="More design articles"
              subHeading="Over 1118 articles "
              posts={DEMO_POSTS.filter(
                (p, i) => i > 3 && i < 25 && p.postType === 'standard'
              )}
            />
          </div>
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card11"
              heading="More design articles"
              subHeading="Over 1118 articles "
              posts={DEMO_POSTS.filter(
                (p, i) => i > 3 && i < 25 && p.postType === 'standard'
              )}
            />
          </div>

          <SectionSliderNewCategories
            className="py-16 lg:py-28"
            heading="Top trending topics"
            subHeading="Discover 233 topics"
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            categoryCardType="card4"
          />
        </div>
      </div>
    </section>
  );
};

export default PageHome;
