'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import useTrans from '@/hooks/useTranslate';

function NotFound() {
  const lang = useTrans();
  return (
    <div className="bg-white">
      <div className="lg:grid lg:grid-cols-12 flex flex-col-reverse mt-2 mb-40 px-[0.94rem] lg:gap-8 md:gap-5 lg:px-16 lg:pt-[7.25rem] lg:pb-[13.25rem] items-center">
        <div className="lg:col-start-2 lg:col-span-4">
          <div className="flex flex-col space-y-6 justify-start">
            <div className="text-labe-without-position !text-[2.125rem] !leading-10">
              Không tìm thấy trang
            </div>
            <div className=" text-[#141C37] text-base font-normal !leading-6">
              Trang bạn tìm kiếm không tồn tại vui lòng thử lại
            </div>
            <Link href={`/${lang}/news`}>
              <button className="bg-[#4684FB] flex items-center justify-center text-white px-2 py-[1.375rem] w-40 h-10 rounded-lg">
                Quay lại trang chủ
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:col-start-7 lg:col-span-5">
          <Image
            src="/image/404.png"
            alt="404 not found"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full object-cover lg:h-[33rem] h-[22.5rem]"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
