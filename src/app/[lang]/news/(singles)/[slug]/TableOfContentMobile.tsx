'use client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { translateLanguage } from '@/utils/translateLanguage';
import useTrans from '@/hooks/useTranslate';

function TableOfContentMobile({
  data,
  setIsLoadMore,
}: {
  data: any;
  setIsLoadMore: (data: boolean) => void;
}) {
  const [active, setActive] = useState('');
  const [isScrollToToc, setIsScrollToToc] = useState(false);
  const [isOpenTOC, setIsOpenTOC] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);
  const lang = useTrans();
  useEffect(() => {
    const handleScroll = () => {
      if (
        (document.getElementById('toc-wrap')?.offsetTop || 0) <= window.scrollY
      ) {
        setIsScrollToToc(true);
      } else {
        setIsScrollToToc(false);
      }

      let selectItem = '';
      data.forEach((element: any) => {
        if (
          (document.getElementById(element?.href)?.offsetTop || 0) <=
          window.scrollY - 500
        ) {
          selectItem = element?.href;
        }
      });
      setActive(selectItem);
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToElement = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setIsLoadMore?.(false);
  };

  return (
    <div className="block lg:hidden pb-3">
      <div
        className="p-4 top-[4.5rem] bg-white rounded-xl z-20 select-none space-y-4 md:inset-x-6 inset-x-0 "
        id="toc-wrap"
      >
        <div
          className=" flex justify-between items-center"
          onClick={() => setIsOpenTOC(!isOpenTOC)}
        >
          <p className="text-[#01123C] text-xl font-semibold ">
            {translateLanguage('list_post', lang)}
          </p>
          <ChevronDownIcon
            className={classNames({ 'rotate-180': isOpenTOC }, 'h-5 w-5')}
          />
        </div>
        <div
          className={classNames(
            'overflow-hidden transition-all border-t border-[#CBD6E1]',
            {
              'absolute hidden': !isOpenTOC,
              block: isOpenTOC,
            }
          )}
        >
          {data.map((item: any) => (
            <div
              key={item?.value + item?.tagName}
              className={classNames(
                'py-2 transition-colors ease-in-out break-words',
                {
                  'pl-9 text-[0.875rem]': item?.tagName === 'h3',
                  'pl-5 text-[0.875rem]': item?.tagName === 'h2',
                  'text-base': item?.tagName === 'h1',
                },
                {
                  'text-[#E7262B] font-semibold': item?.href === active,
                  'text-[#425466] font-normal': !active,
                }
              )}
            >
              <a href={`#${item?.href}`} onClick={handleScrollToElement}>
                {item?.value}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div
        className={classNames(' select-none', {
          block: isScrollToToc,
          hidden: !isScrollToToc,
        })}
      >
        <div className="fixed md:top-[7.5rem] top-[6rem]  md:right-10 right-[1.6rem]  bg-white px-3 py-2 rounded-lg shadow-list transition ease-in-out z-30">
          <ListBulletIcon
            onClick={() => setIsOpenList(!isOpenList)}
            className={classNames({ 'text-[#1C64F2]': isOpenList }, 'w-5 h-5')}
          />
        </div>
        <div
          className={classNames(
            'h-3/4 overflow-scroll overscroll-contain fixed md:right-6 right-4 md:top-28  top-[5.64rem] bg-white px-4 shadow-list rounded-xl transition-all ease-in-out w-4/5 md:w-1/2 z-20',
            { hidden: !isOpenList, block: isOpenList }
          )}
        >
          <div className=" flex justify-between items-start sticky top-0 bg-white py-4 flex-col  border-b border-[#CBD6E1]">
            <p className="text-[#01123C] text-xl font-semibold">
              {translateLanguage('list_post', lang)}
            </p>
          </div>
          <div className="pb-4">
            {data.map((item: any) => (
              <div
                key={item?.value + item?.tagName}
                className={classNames(
                  'py-2 transition-colors ease-in-out break-words',
                  {
                    'pl-9 text-[0.875rem]': item?.tagName === 'h3',
                    'pl-5 text-[0.875rem]': item?.tagName === 'h2',
                    'text-base': item?.tagName === 'h1',
                    'text-[#E7262B] font-semibold': item?.href === active,
                    'text-[#425466] font-normal': item?.href !== active,
                  }
                )}
              >
                <a href={`#${item?.href}`} onClick={handleScrollToElement}>
                  {item?.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableOfContentMobile;
