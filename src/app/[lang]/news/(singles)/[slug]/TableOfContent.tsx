'use client';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';

function TableOfContent({
  data,
  lang,
  setIsLoadMore,
  category
}: {
  data: any;
  lang: Language;
  setIsLoadMore: (data: boolean) => void;
  category: any
}) {
  const [active, setActive] = useState('');
  const [positionEnd, setPositionEnd] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const endElement =
        (document.getElementById('wrap')?.offsetHeight || 0) -
        (document.getElementById('toc')?.offsetHeight || 0);
      if (window.scrollY >= endElement) {
        setPositionEnd(endElement);
      } else {
        setPositionEnd(0);
      }
      let selectItem = '';
      data.forEach((element: any) => {
        if (
          (document.getElementById(element?.href)?.offsetTop || 0) <=
          window.scrollY - 440
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
    setIsLoadMore?.(false)

  //   e.preventDefault();
  //   const href = e.currentTarget.href;
  //   const targetId = href.replace(/.*\#/, '');
  //   const element = document.getElementById(targetId);
  //   if (element) {
      // window.scrollTo({
      //   behavior: 'smooth',
      //   top:
      //     document.body.getBoundingClientRect().top -
      //     81,
      // });
  //   }
  };

  return (
    <div className="space-y-1 min-w-[20rem] relative hidden lg:block mr-4 " id="wrap">
      <div
        className={` w-[20rem] ${!Boolean(positionEnd) ? 'fixed' : 'absolute'} `}
        id="toc"
        style={{ ...(Boolean(positionEnd) && { top: positionEnd }) }}
      >
        <Link
          href={`/${lang}/news/archive/${category?.slug}`}
          className="pb-8 flex flex-row space-x-3 items-center cursor-pointer"
        >
          <ChevronDoubleLeftIcon className="w-5 h-5 font-semibold" />
          <p className="text-[#01123C] dark:text-white font-semibold text-lg ">
            Quay lại {category?.name}
          </p>
        </Link>
        <div>
          {data.map((item: any) => (
            <div
              key={item?.value + item?.tagName}
              className={classNames(
                'py-2 transition-colors ease-in-out',
                {
                  'pl-9 text-[0.875rem]': item?.tagName === 'h3',
                  'pl-5 text-[0.875rem]': item?.tagName === 'h2',
                  'text-base': item?.tagName === 'h1',
                },
                {
                  'text-[#11295E] font-bold': item?.href === active,
                  'text-[#425466] dark:text-white font-semibold': item?.href !== active,
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
  );
}

export default TableOfContent;
