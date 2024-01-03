import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
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
  params: { lang: Language; slug: string };
}) => {
  const responseSeo = await getData(params?.lang, '/homepage/seo');

  const response = await getData(params?.lang, '/homepage/data');
  const postByCategory = await getData(params?.lang, '/homepage/postByCate');
  const filterCategories = [{ id: 0, name: 'Tất cả' }];
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
            className="py-16 lg:py-24"
            posts={MAGAZINE2_POSTS}
            categories={filterCategories.concat(response?.NewPost?.categories)}
            lang={params?.lang}
          />
          <SectionMagazine1
            heading={response?.PopularPost?.title}
            desc={response?.PopularPost?.description}
            className="py-16 lg:py-28"
            posts={response?.PopularPost?.data}
          />
          <div className="relative py-16">
            <BackgroundSection />
            <SectionMagazine9
              heading={response?.Section1?.title}
              desc={response?.Section1?.description}
              posts={response?.Section1?.tagPost}
              cate={response?.Section1?.category}
            />
          </div>
          {(postByCategory?.PostByCategory || [])?.map((item: any) => (
            <div className="relative py-16" key={item?.id}>
              <BackgroundSection />
              <SectionSliderPosts
                postCardName="card11"
                heading={item?.title}
                subHeading={
                  item?.description ||
                  `Khám phá hơn ${item?.category?.blogs?.length} bài viết`
                }
                posts={item?.category?.blogs}
                cate={item?.category}
              />
            </div>
          ))}
          <SectionSubscribe2 />

          <SectionSliderNewCategories
            className="py-16 lg:py-28"
            heading="Diễn đàn và thảo luận"
            subHeading="Khám phá hơn 233 chủ đề"
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            categoryCardType="card4"
          />
        </div>
      </div>
    </section>
  );
};

export default PageHome;
