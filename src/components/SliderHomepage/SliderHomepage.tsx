// ./frontend/src/app/[lang]/components/PageHeader.tsx
'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles,
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { getStrapiMedia } from '../utils/api-helpers';

export default function BannerSwipers({
  data
}: {
  data: any;
  backgroundImage?: any;
  Seo?: any;
}) {
  const pathName = usePathname();
  const [newData, setData] = useState<any>();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  useEffect(() => {
    console.log('data', newData, data);

    setData(data);
  }, []);
  return (
    <div className="SwiperPageHeader relative h-[170px] md:h-[600px] group/item">
      <Swiper
        autoplay={true}
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        initialSlide={1}
        loop={true}
        speed={500}
        className="w-full h-full"
        direction="horizontal"
      >
        {newData?.map((item: any, index: any) => {
          return (
            <SwiperSlide key={`swiper-${index}`} className="overflow-hidden">
              <div className="w-full h-full relative">
                <a
                  href={item?.BannerLink || '#'}
                  target={item?.isNewTab ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <Image
                    priority={true}
                    src={getStrapiMedia(item?.BannerImage?.url, false) || ''}
                    alt={''}
                    width={item?.BannerImage?.width}
                    height={item?.BannerImage?.height}
                    sizes="(min-width: 1624px) 100vw, 1240px"
                    className="w-full h-full object-center object-cover"
                    quality={100}
                  />
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <div className="flex items-center absolute bottom-[calc(50%-28px)] z-10 justify-between p-7 w-full invisible md:group-hover/item:visible"> */}
      <button
        ref={navigationPrevRef}
        className="absolute bottom-[calc(50%-28px)] z-10 left-5 w-14 h-14 border border-[#e6e6e6] bg-[#ccc] rounded-full text-xs text-white flex items-center justify-center invisible md:group-hover/item:visible"
      >
        <ChevronLeftIcon className="h-8 w-6" />
      </button>
      <button
        ref={navigationNextRef}
        className="absolute bottom-[calc(50%-28px)] z-10 right-5   w-14 h-14 border border-[#e6e6e6] bg-[#ccc] rounded-full text-xs text-white flex items-center justify-center invisible md:group-hover/item:visible"
      >
        <ChevronRightIcon className="h-8 w-6" />
      </button>
    </div>
  );
}
