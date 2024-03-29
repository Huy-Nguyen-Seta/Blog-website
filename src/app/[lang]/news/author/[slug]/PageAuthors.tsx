'use client';

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Loading from '@/components/Button/Loading';
import Card11 from '@/components/Card11/Card11';
import NcDropDown from '@/components/NcDropDown/NcDropDown';
import NcImage from '@/components/NcImage/NcImage';
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox/SectionGridCategoryBox';
import SectionSliderNewAuthors from '@/components/SectionSliderNewAthors/SectionSliderNewAuthors';
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
import { SOCIALS_DATA } from '@/components/SocialsShare/SocialsShare';
import VerifyIcon from '@/components/VerifyIcon';
import { getStrapiImage } from '@/components/utils/api-helpers';
import { handleFetchStorage } from '@/components/utils/dispatch';
import { getData } from '@/components/utils/fetch-api';
import { DEMO_AUTHORS } from '@/data/authors';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { translateLanguage } from '@/utils/translateLanguage';
import { GlobeAltIcon, ShareIcon } from '@heroicons/react/24/outline';
import { locale } from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const numberPerPage = 8;

export const PageAuthors = ({
  params,
}: {
  params: { lang: Language; slug: string };
}) => {
  const [authorInfor, setAuthorInfor] = useState<any>();
  const [blogs, setBlogs] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchDataBlogs = async (page: number, limit: number) => {
    setIsLoading(true);

    const { data } = await getData(params?.lang, '/getBLogsByQuery', {
      start: page,
      limit: limit,
      authorSlug: params?.slug,
    });
    setBlogs([...blogs, ...data]);
    setIsLoading(false);
  };

  const fetchAuthorInformation = async () => {
    const data = await getData(
      params?.lang,
      `/findAuthorBySlug/${params?.slug}`
    );
    setAuthorInfor(data);
    fetchDataBlogs(0, 8);
    const newData = {...data, localizations : data?.localizations?.concat([{id: data?.id , slug: data?.slug , locale: data?.locale}])}

    if (localStorage)
    localStorage.setItem('author', JSON.stringify(newData));
  };
  useEffect(() => {
    fetchAuthorInformation();
    handleFetchStorage(params?.lang, dispatch);
  }, []);
  return (
    <div className={`nc-PageAuthor `}>
      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            alt=""
            containerClassName="absolute inset-0"
            sizes="(max-width: 1280px) 100vw, 1536px"
            src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
            fill
            priority
          />
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
            <div className="w-32 lg:w-40 flex-shrink-0 mt-12 sm:mt-0">
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold rounded-full w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0 shadow-2xl z-0">
                <Image
                  alt={authorInfor?.image?.name || ''}
                  src={getStrapiImage(authorInfor?.image) || ''}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/*  */}
            <div className="pt-5 md:pt-1 lg:ml-6 xl:ml-12 flex-grow">
              <div className="max-w-screen-sm space-y-3.5 ">
                <h2 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  <span>{authorInfor?.name}</span>
                  <VerifyIcon
                    className="ml-2"
                    iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                  />
                </h2>
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                  {authorInfor?.description}
                </span>
                <a
                  href="#"
                  className="flex items-center text-xs font-medium space-x-2.5 rtl:space-x-reverse cursor-pointer text-neutral-500 dark:text-neutral-400 truncate"
                >
                  <GlobeAltIcon className="flex-shrink-0 w-4 h-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 truncate">
                    {authorInfor?.link}
                  </span>
                </a>
              </div>
            </div>

            {/*  */}
            <div className="absolute md:static start-5 end-5 top-4 sm:start-auto sm:top-5 sm:end-5 flex justify-end">
              {/* <FollowButton
                  isFollowing={false}
                  fontSize="text-sm md:text-base font-medium"
                  sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
                /> */}

              <div className="mx-2">
                <NcDropDown
                  className="flex-shrink-0 flex items-center justify-center focus:outline-none h-10 w-10 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
                  renderTrigger={() => <ShareIcon className="h-5 w-5" />}
                  onClick={() => {}}
                  data={SOCIALS_DATA}
                  url={
                    process.env.NEXT_PUBLIC_HOST
                      ? process.env.NEXT_PUBLIC_HOST +
                        `/${params?.lang}` +
                        '/author/' +
                        authorInfor?.slug
                      : '#'
                  }
                />
              </div>

              {/* <AccountActionDropdown containerClassName="h-10 w-10 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700" /> */}
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          {/* <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
              <Nav className="sm:space-x-2 rtl:space-x-reverse">
                {TABS.map((item, index) => (
                  <NavItem
                    key={index}
                    isActive={tabActive === item}
                    onClick={() => handleClickTab(item)}
                  >
                    {item}
                  </NavItem>
                ))}
              </Nav>
              <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
              <div className="flex justify-end">
                <ArchiveFilterListBox lists={FILTERS} />
              </div>
            </div> */}
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

          {/* PAGINATION */}
          {authorInfor?.blogs?.count > page + numberPerPage && (
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
        </main>

        {/* === SECTION 5 === */}
        <div className="relative py-16 !my-8">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
        </div>

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading={translateLanguage('top_author', params?.lang)}
          subHeading={translateLanguage('Explore_our_top_authors', params?.lang)}
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};
