'use client';

import { Disclosure } from '@/app/[lang]/news/headlessui';
import ButtonClose from '@/components/ButtonClose/ButtonClose';
import Logo from '@/components/Logo/Logo';
import SocialsList from '@/components/SocialsList/SocialsList';
import SwitchDarkMode from '@/components/SwitchDarkMode/SwitchDarkMode';
import { NAVIGATION_DEMO_2 } from '@/data/navigation';
import useTrans from '@/hooks/useTranslate';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getData } from '../utils/fetch-api';
import { NavItemType } from './NavigationItem';
import { useRouter } from 'next/navigation';

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO_2,
  onClickClose,
}) => {
  const lang = useTrans();
  const router = useRouter();
  const [navBar, setNavBar] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    console.log('search', search);
    router.push(`/${lang}/news/search?search=${search}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(lang, '/getNavBars');
      setNavBar(response);
    };
    fetchData();
  }, [lang]);
  const _renderMenuChild = (
    item: NavItemType,
    itemClass = ' pl-3 text-neutral-900 dark:text-neutral-200 font-medium '
  ) => {
    return (
      <ul className="nav-mobile-sub-menu ps-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={index} as="li">
            <Link
              href={{
                pathname: i.href || '',
              }}
              className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pe-4 ${itemClass}`}
            >
              <span
                className={`py-2.5 ${!i.children ? 'block w-full' : ''}`}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex items-center flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ms-2 h-4 w-4 text-slate-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>
                {_renderMenuChild(
                  i,
                  'ps-3 text-slate-600 dark:text-slate-400 '
                )}
              </Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={index}
        as="li"
        className="text-slate-900 dark:text-white"
      >
        <Link
          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          href={{
            pathname: `/news/${item.href}` || '',
          }}
        >
          <span
            className={!item.children ? 'block w-full' : ''}
            onClick={onClickClose}
          >
            {item.name}
          </span>
          {item.children && item.children?.length > 0 && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ms-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        action=""
        method="POST"
        className="flex-1 text-slate-900 dark:text-slate-200"
        onSubmit={handleSubmitForm}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1 rtl:space-x-reverse py-2 px-4 rounded-xl h-full">
          {renderMagnifyingGlassIcon()}
          <input
            type="search"
            placeholder="Tìm kiếm và nhấn enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm "
            onChange={(e) => setSearch(e?.target?.value)}
          />
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-slate-600 dark:text-slate-300 text-sm">
          <span>
            Khám phá những tác giả nổi bật , những bài viết chất lượng của chúng
            tôi
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute end-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>

        <div className="mt-5">{renderSearchForm()}</div>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1 rtl:space-x-reverse">
        {navBar?.map(_renderItem)}
      </ul>
      {/* <div className="flex items-center justify-between py-6 px-5 space-x-2 rtl:space-x-reverse">
        <ButtonPrimary className="!px-10 relative">
          Buy this template
          <a
            href="https://themeforest.net/item/ncmaz-blog-news-magazine-nextjs-template/44412092"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
          ></a>
        </ButtonPrimary>
      </div> */}
    </div>
  );
};

export default NavMobile;
