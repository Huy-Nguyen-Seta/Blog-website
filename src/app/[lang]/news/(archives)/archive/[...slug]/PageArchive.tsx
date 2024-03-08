'use client';
import { fetchStorageByIdUser } from '@/app/GlobalRedux/action';
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Loading from '@/components/Button/Loading';
import Card11 from '@/components/Card11/Card11';
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox/SectionGridCategoryBox';
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
import { getStrapiImage } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import { ScaleLevel } from '@/interface/Strapi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalCategories from '../../ModalCategories';
import ModalTags from '../../ModalTags';
import { AppDispatch } from '@/app/GlobalRedux/store';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { translateLanguage } from '@/utils/translateLanguage';

export const PageArchive = ({
  params,
}: {
  params: { lang: Language; slug: string[] };
}) => {
  const numberPerPage = 8;
  const FILTERS = [
    { id: 1, name: translateLanguage('most_recent', params?.lang) },
    { id: 2, name: translateLanguage('Favourite', params?.lang) },
  ];
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(FILTERS[0]);
  const [dataInfor, setDataInfor] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();
  const isTag = params?.slug[0] === 'tags';
  const currentSlug = !isTag
    ? params?.slug?.join('/')
    : params?.slug?.slice(1)?.join('/');
  const fetchDataBlogs = async (page: number, limit: number) => {
    setIsLoading(true);

    const { data } = await getData(params?.lang, '/getBLogsByQuery', {
      start: page,
      limit: limit,
      ...(!isTag && { cateSlug: currentSlug }),
      ...(isTag && { tagSlugs: currentSlug }),
      ...(selected?.id === 1 ? { isRecent: true } : { isMostLike: true }),
      populate: '*',
    });
    setBlogs([...blogs, ...data]);
    setIsLoading(false);
  };
  const fetchDataInfor = async () => {
    let dataInfo;
    if (!isTag) {
      dataInfo = await getData(params?.lang, `/findCateBySlug/${currentSlug}`);
    } else {
      dataInfo = await getData(params?.lang, `/findTagBySlug/${currentSlug}`);
    }
    setDataInfor(dataInfo);
  };
  useEffect(() => {
    let user;
    if (localStorage.getItem('userInfor')) {
      user = JSON.parse(localStorage.getItem('userInfor') || '');
    }

    fetchDataInfor();
    const fetchDataCategories = async () => {
      const categories = await getData(params?.lang, '/getCategories');
      const tags = await getData(params?.lang, '/getTags');
      setCategories(categories);
      setTags(tags);
    };
    const handleFetchStorage = (userId: string, lang: Language) => {
      dispatch(fetchStorageByIdUser({ userId: userId, lang: lang }));
    };
    fetchDataCategories();
    if (params?.lang) {
      fetchDataBlogs(0, numberPerPage);
      if (user) {
        handleFetchStorage(user?._id, params?.lang);
      }
    }
  }, [params?.lang]);

  const handleChangeFilter = (value: any) => {
    const handleSelected = async () => {
      setIsLoading(true);
      const { data } = await getData(params?.lang, '/getBLogsByQuery', {
        start: 0,
        limit: numberPerPage,
        ...(!isTag && { cateSlug: currentSlug }),
        ...(isTag && { tagSlugs: currentSlug }),
        ...(value?.id === 1 ? { isRecent: true } : { isMostLike: true }),
      });
      setBlogs(data);
      setIsLoading(false);
      setPage(0);
    };
    handleSelected();
    setSelected(value);
  };
  return (
    <div className={`nc-PageArchive`}>
      {/* HEADER */}
      {isTag ? (
        <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
          <div className="container pt-16 lg:pt-28 ">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-6xl ">
              {dataInfor?.tagName}
            </h2>
            <span className="block mt-4">
              {translateLanguage('total', params?.lang)}{dataInfor?.blogs?.count || 0} {translateLanguage('post', params?.lang)}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
          <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
            <Image
              alt={dataInfor?.image?.name}
              fill
              src={
                getStrapiImage(dataInfor?.image, ScaleLevel.EXTRA_LARGE) || ''
              }
              className="object-cover w-full h-full rounded-3xl md:rounded-[40px]"
              sizes="(max-width: 1280px) 100vw, 1536px"
            />
            <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
              <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
                {dataInfor?.name}
              </h2>
              <span className="block mt-4 text-neutral-300">
                {dataInfor?.blogs?.count} {translateLanguage('post', params?.lang)}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* ====================== END HEADER ====================== */}

      <div className="container pt-10 pb-16 lg:pb-8 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              <ModalCategories categories={categories} />
              <ModalTags tags={tags} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox
                lists={FILTERS}
                selected={selected}
                setSelected={handleChangeFilter}
              />
            </div>
          </div>
          {!blogs.length && (
            <div className=" flex justify-center items-center">
              <span className="pt-10">
                {isLoading ? <Loading /> : translateLanguage('emty_list', params?.lang)}
              </span>
            </div>
          )}
          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {blogs.map((post: any) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>

          {/* PAGINATIONS */}
          {dataInfor?.blogs?.count > page + numberPerPage && (
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
              <ButtonPrimary
                onClick={() => {
                  setPage((pre) => pre + numberPerPage);
                  fetchDataBlogs(page + numberPerPage, numberPerPage);
                }}
              >
                {translateLanguage('watch_more', params?.lang)}
              </ButtonPrimary>
            </div>
          )}
        </div>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <div className="relative py-16 !my-8">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={categories?.filter((_, i) => i < 10)}
          />
        </div>

        {/* === SECTION 5 === */}
        {/* <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        /> */}

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
        <SectionSliderNewCategories
          className="py-10 lg:pt-16 !my-8"
          heading={translateLanguage('forum', params?.lang)}
          subHeading={`${translateLanguage('explore_more', params?.lang)} 233 ${translateLanguage('topic', params?.lang)}`}
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        />
      </div>
    </div>
  );
};
