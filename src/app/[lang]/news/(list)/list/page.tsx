'use client';

import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import ButtonCircle from '@/components/Button/ButtonCircle';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Loading from '@/components/Button/Loading';
import Card11 from '@/components/Card11/Card11';
import CardAuthorBox2 from '@/components/CardAuthorBox2/CardAuthorBox2';
import CardCategory2 from '@/components/CardCategory2/CardCategory2';
import Input from '@/components/Input/Input';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import NcImage from '@/components/NcImage/NcImage';
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox/SectionGridCategoryBox';
import SectionSliderNewAuthors from '@/components/SectionSliderNewAthors/SectionSliderNewAuthors';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
import Tag from '@/components/Tag/Tag';
import { getStrapiImage } from '@/components/utils/api-helpers';
import { handleFetchStorage } from '@/components/utils/dispatch';
import { getData } from '@/components/utils/fetch-api';
import { DEMO_AUTHORS } from '@/data/authors';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { ScaleLevel } from '@/interface/Strapi';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const TABS = ['Bài viết', 'Thể loại', 'Thẻ', 'Tác giả'];
const numberPerPage = 8;

const PageList = ({ params }: { params: { lang: Language } }) => {
  const [tabActive, setTabActive] = useState(TABS[0]);
  const [page, setPage] = useState(0);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [authors, setAuthor] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState<any>();
  const dispatch = useDispatch();
  const handleFetch = async (
    searchValue: string = '',
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

  const fetchListData = async () => {
    const listData = await getData(params?.lang, `/list-page`, {
      populate: ['thumbnailImage'],
    });
    setListData(listData?.attributes);
    console.log('listData', listData);
  };

  const fetchData = async (
    page?: number,
    limit?: number,
    currentTab?: string
  ) => {
    switch (currentTab || tabActive) {
      case TABS[0]:
        const data = await handleFetch('', '/getBLogsByQuery', page, limit);
        if (page !== 0) {
          setBlogs([...blogs, ...data?.data]);
        } else {
          setBlogs(data?.data);
        }
        setTotal(data?.total);
        break;
      case TABS[1]:
        const cate = await handleFetch('', '/findCateByPaging', page, limit);
        if (page !== 0) {
          setCategories([...categories, ...cate?.results]);
        } else {
          setCategories(cate?.results);
        }
        setTotal(cate?.total);
        break;
      case TABS[2]:
        const tags = await handleFetch('', '/getTags');
        setTags(tags);
        setTotal(tags?.length);

        break;
      case TABS[3]:
        const author = await handleFetch('', '/getAuthors', page, limit);
        if (page !== 0) {
          setAuthor([...authors, ...author?.results]);
        } else {
          setAuthor(author?.results);
        }
        setTotal(author?.total);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    fetchListData();
    fetchData(0, 8, TABS[0]);
  }, []);

  useEffect(() => {
    handleFetchStorage(params?.lang, dispatch);
  }, [params?.lang]);

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setPage(0);
    setTabActive(item);
    fetchData(0, numberPerPage, item);
  };
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
            <Nav
              containerClassName="w-full overflow-x-auto hiddenScrollbar"
              className="sm:space-x-2 rtl:space-x-reverse"
            >
              {TABS?.map((item, index) => (
                <NavItem
                  isActive={item === tabActive}
                  key={index}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
          </div>
          {!total ? (
            <div className=" flex justify-center items-center">
              <span className="pt-10">
                {isLoading ? <Loading /> : 'Danh sách rỗng !'}
              </span>
            </div>
          ) : (
            <>
              {/* LOOP ITEMS */}
              {/* LOOP ITEMS POSTS */}
              {tabActive === TABS[0] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
                  {blogs?.map((post) => (
                    <Card11 key={post.id} post={post} />
                  ))}
                </div>
              )}
              {/* LOOP ITEMS CATEGORIES */}
              {tabActive === TABS[1] && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
                  {categories?.map((cat) => (
                    <CardCategory2 key={cat.id} taxonomy={cat} />
                  ))}
                </div>
              )}
              {/* LOOP ITEMS TAGS */}
              {tabActive === TABS[2] && (
                <div className="flex flex-wrap mt-12 ">
                  {tags?.map((tag) => (
                    <Tag className="mb-3 mr-3" key={tag.id} tag={tag} />
                  ))}
                </div>
              )}
              {/* LOOP ITEMS POSTS */}
              {tabActive === TABS[3] && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
                  {authors?.map((author) => (
                    <CardAuthorBox2 key={author.id} author={author} />
                  ))}
                </div>
              )}
            </>
          )}
          {/* PAGINATION */}
          {total > page + numberPerPage && tabActive !== TABS[2] && (
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
              <ButtonPrimary
                onClick={() => {
                  setPage((pre) => pre + numberPerPage);
                  fetchData(page + numberPerPage, numberPerPage);
                }}
              >
                Xem thêm
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
          heading="Những tác giả hàng đầu"
          subHeading="Khám phá những tác giả hàng đầu của chúng tôi"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
        <SectionSliderNewCategories
          className="py-10 lg:py-4"
          heading="Diễn đàn và thảo luận"
          subHeading="Khám phá hơn 233 chủ đề"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        />
      </div>
    </div>
  );
};

export default PageList;
