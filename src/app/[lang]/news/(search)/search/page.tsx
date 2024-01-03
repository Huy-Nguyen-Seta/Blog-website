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
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
import Tag from '@/components/Tag/Tag';
import { handleFetchStorage } from '@/components/utils/dispatch';
import { getData } from '@/components/utils/fetch-api';
import { DEMO_AUTHORS } from '@/data/authors';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const TABS = ['Bài viết', 'Thể loại', 'Thẻ', 'Tác giả'];
const numberPerPage = 8;

const PageSearch = ({ params }: { params: { lang: Language } }) => {
  const [tabActive, setTabActive] = useState(TABS[0]);
  const [searchValue, setSearchValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [page, setPage] = useState(0);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [authors, setAuthor] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const handleFetch = async (
    searchValue: string = '',
    path: string = '',
    page?: number,
    limit?: number
  ): Promise<any> => {
    setIsLoading(true);
    const data = await getData(params?.lang, path, {
      ...(searchValue && { searchValue: searchValue }),
      ...(limit && { limit: limit }),
      ...(page && { start: page }),
      populate: '*',
    });
    setIsLoading(false);

    return data;
  };

  const fetchData = async (page?: number, limit?: number, search?: string) => {
    switch (tabActive) {
      case TABS[0]:
        const data = await handleFetch(
          searchValue || search,
          '/getBLogsByQuery',
          page,
          limit
        );
        console.log('data--', data?.data);
        if (page !== 0) {
          setBlogs([...blogs, ...data?.data]);
        } else {
          setBlogs(data?.data);
        }
        setTotal(data?.total);
        break;
      case TABS[1]:
        const cate = await handleFetch(
          searchValue,
          '/findCateByPaging',
          page,
          limit
        );
        if (page !== 0) {
          setCategories([...categories, ...cate?.results]);
        } else {
          setCategories(cate?.results);
        }
        setTotal(cate?.total);
        break;
      case TABS[2]:
        const tags = await handleFetch(searchValue, '/getTags');
        setTags(tags);
        setTotal(tags?.length);

        break;
      case TABS[3]:
        const author = await handleFetch(
          searchValue,
          '/getAuthors',
          page,
          limit
        );
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
    if (search && !isDirty) {
      setCurrentValue(search || '');
      setSearchValue(search || '');
      fetchData(0, 8, search);
    } else {
      fetchData(0, 8);
    }
  }, [search, tabActive]);

  useEffect(() => {
    handleFetchStorage(params?.lang, dispatch);
  }, [params?.lang]);

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setPage(0);
    fetchData(0, numberPerPage);
    setTabActive(item);
  };
  return (
    <div className={`nc-PageSearch`}>
      {/* HEADER */}
      <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-9 lg:aspect-h-5 overflow-hidden z-0">
          <NcImage
            alt="search"
            fill
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
        </div>
        {/* CONTENT */}
        <div className="relative container -mt-20 lg:-mt-48">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex items-center">
            <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl font-semibold">
                {currentValue}
              </h2>
              {currentValue && (
                <span className="block text-xs sm:text-sm mt-4 text-neutral-500 dark:text-neutral-300">
                  Tìm thấy{' '}
                  <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                    {total}
                  </strong>{' '}
                  {tabActive} cho từ khóa{' '}
                  <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                    {currentValue}
                  </strong>
                </span>
              )}
              <form
                className="relative w-full mt-8 sm:mt-11 text-left"
                method="post"
                onSubmit={(e) => {
                  e?.preventDefault();
                  setCurrentValue(searchValue);
                  fetchData(0, numberPerPage);
                  setPage(0);
                }}
              >
                <label
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  <span className="sr-only">Search all icons</span>
                  <Input
                    id="search-input"
                    type="search"
                    placeholder="Nhập từ khóa tìm kiếm"
                    sizeClass="pl-14 py-5 pe-5 md:ps-16"
                    defaultValue={currentValue}
                    onChange={(e) => {
                      setSearchValue(e?.target?.value);
                      setIsDirty(true);
                    }}
                  />
                  <ButtonCircle
                    className="absolute end-2.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    type="submit"
                  >
                    <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
                  </ButtonCircle>
                  <span className="absolute start-5 top-1/2 transform -translate-y-1/2 text-2xl md:start-6">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                      ></path>
                    </svg>
                  </span>
                </label>
              </form>
            </header>
          </div>
        </div>
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
              {TABS.map((item, index) => (
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
          {!total && (
            <div className=" flex justify-center items-center">
              <span className="pt-10">
                {isLoading ? <Loading /> : 'Danh sách rỗng !'}
              </span>
            </div>
          )}
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
        <div className="relative py-16">
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
      </div>
    </div>
  );
};

export default PageSearch;
