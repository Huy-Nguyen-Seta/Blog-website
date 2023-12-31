'use client';
import React, { useState } from 'react';
import TableOfContent from './TableOfContent';
import SingleHeader from '../../../SingleHeader';
import TableOfContentMobile from './TableOfContentMobile';
import SingleContent from '../../../SingleContent';
import useTrans from '@/hooks/useTranslate';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

function Content({
  output,
  response,
  contentHasId,
}: {
  output: any;
  response: any;
  contentHasId: any;
}) {
  const [isLoadMore, setIsLoadMore] = useState(true);
  const lang = useTrans();

  return (
    <div className="lg:flex flex-row container">
      <TableOfContent
        category={response?.attributes?.category?.data?.attributes}
        data={output}
        lang={lang}
        setIsLoadMore={setIsLoadMore}
      />

      <div>
        <header className=" lg:!pl-0 rounded-xl">
          <div className="pb-4 flex items-center space-x-1 text-[#676767] font-medium text-sm">
            <Link
              className="px-[10px] py-[3px] rounded-2xl border border-solid border-[#e7e7e7]"
              href={'/news'}
            >
              Trang chủ
            </Link>
            <ChevronRightIcon
              height={20}
              width={20}
              fontSize={22}
              strokeWidth={1.5}
              fontWeight={500}
              className='stroke-2'
            />
            <Link
              className=" dark:text-white font-medium px-[10px] py-[3px] rounded-2xl border border-solid border-[#e7e7e7]"
              href={`/news/archive/${response?.attributes?.category?.data?.attributes?.slug}`}
            >
              {response?.attributes?.category?.data?.attributes?.name}
            </Link>
          </div>

          <div className="max-w-screen-md mx-auto">
            <SingleHeader
              data={{ ...response?.attributes, id: response?.id }}
            />
          </div>
        </header>

        <div className=" lg:!pl-0  mt-10">
          <TableOfContentMobile data={output} setIsLoadMore={setIsLoadMore} />
          <SingleContent
            isLoadMore={isLoadMore}
            setIsLoadMore={setIsLoadMore}
            data={{ ...response?.attributes, id: response?.id }}
            content={contentHasId}
          />
        </div>
      </div>
    </div>
  );
}

export default Content;
