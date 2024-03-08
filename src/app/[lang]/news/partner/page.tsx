'use client';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Loading from '@/components/Button/Loading';
import CardPartner from '@/components/CardPartner/CardPartner';
import NcImage from '@/components/NcImage/NcImage';
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox/SectionGridCategoryBox';
import SectionSliderNewAuthors from '@/components/SectionSliderNewAthors/SectionSliderNewAuthors';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
import { getStrapiImage } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import { DEMO_AUTHORS } from '@/data/authors';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { ScaleLevel } from '@/interface/Strapi';
import { translateLanguage } from '@/utils/translateLanguage';
import { useEffect, useState } from 'react';
const numberPerPage = 8;

const Partner = ({ params }: { params: { lang: Language } }) => {
  const [page, setPage] = useState(0);
  const [partners, setPartners] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState<any>();

  const fetchListData = async () => {
    const listData = await getData(params?.lang, `/list-page`, {
      populate: ['thumbnailImage'],
    });
    setListData(listData?.attributes);
  };

  const handleFetch = async (
    path: string = '',
    page?: number,
    limit?: number
  ): Promise<any> => {
    setIsLoading(true);
    const data = await getData(params?.lang, path, {
      ...(limit && { limit: limit }),
      ...(page && { start: page }),
      populate: '*',
    });
    setIsLoading(false);

    return data;
  };

  const fetchData = async (page?: number, limit?: number) => {
    const data = await handleFetch('/getPartners', page, limit);
    if (page !== 0) {
      setPartners([...partners, ...data?.data]);
    } else {
      setPartners(data?.data);
    }
    setTotal(data?.total);
  };

  useEffect(() => {
    fetchListData();
    fetchData(0, numberPerPage);
  }, []);

  return (
    <div className={`nc-PageList`}>
      {/* HEADER */}
      <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-9 lg:aspect-h-5 overflow-hidden z-0">
          <NcImage
            alt="search"
            fill
            containerClassName="absolute inset-0"
            src={
              listData
                ? getStrapiImage(
                    listData?.thumbnailImage?.data?.attributes,
                    ScaleLevel.EXTRA_LARGE
                  ) || ''
                : ''
            }
            className="object-cover w-full h-full"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          {/* <div className="inset-0 absolute flex items-end pb-20 justify-center">
          <h2 className="inline-block align-middle text-5xl font-semibold md:text-6xl text-white">
            Trang Danh Sách
          </h2>
        </div> */}
        </div>
        {/* CONTENT */}
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
          </div>
          {!total ? (
            <div className=" flex justify-center items-center">
              <span className="pt-10">
                {isLoading ? <Loading /> : translateLanguage('emty_list', params?.lang)}
              </span>
            </div>
          ) : (
            <>
              {/* LOOP ITEMS */}
              {/* LOOP ITEMS POSTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10 auto-rows-fr">
                {partners?.map((post) => (
                  <CardPartner key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
          {/* PAGINATION */}
          {total > page + numberPerPage && (
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
              <ButtonPrimary
                onClick={() => {
                  setPage((pre) => pre + numberPerPage);
                  fetchData(page + numberPerPage, numberPerPage);
                }}
              >
                {translateLanguage('watch_more', params?.lang)}
              </ButtonPrimary>
            </div>
          )}
        </main>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <div className="relative pt-8 py-4 !my-8">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="text-center mx-auto mt-10 md:mt-16"></div>
        </div>

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading={translateLanguage('top_author', params?.lang)}
          subHeading={translateLanguage('Explore_our_top_authors', params?.lang)}
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
        <SectionSliderNewCategories
          className="py-10 lg:py-4"
          heading={translateLanguage('forum', params?.lang)}
          subHeading={`${translateLanguage('explore_more', params?.lang)} 233 ${translateLanguage('topic', params?.lang)}`}
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        />
      </div>
    </div>
  );
};

export default Partner;
