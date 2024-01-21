import React from 'react';
import Logo from '@/components/Logo/Logo';
import SocialsList1 from '@/components/SocialsList1/SocialsList1';
import { CustomLink } from '@/data/types';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import { getData } from '../utils/fetch-api';
import Image from 'next/image';
import Link from 'next/link';

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
  items: CustomLink[];
  groupName: string;
}

const Footer = async ({ lang }: { lang: Language }) => {
  const data = await getData(lang, '/getFooter');
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="md:text-sm text-xs">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu?.groupName}
        </h2>
        <ul className="mt-5 md:space-y-4 space-y-2">
          {menu?.items.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="_blank"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {/* music player */}
      <MusicPlayer />

      {/* footer */}
      <div className="nc-Footer relative pt-10 md:pt-16 lg:pt-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-5 md:gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
            <div className="lg:flex flex-row items-start  space-x-4 pr-8 hidden dark:hidden">
              <Image
                alt="Hallo"
                src={'/image/dmca.png'}
                width={140}
                height={140}
                className="block"
              />
            </div>
          </div>
          {(data?.Footer || [])?.map(renderWidgetMenuItem)}
          <div className="flex md:hidden dark:hidden flex-row items-start  space-x-4 pr-8 ">
            <Image
              alt="Hallo"
              src={'/image/dmca.png'}
              width={70}
              height={70}
              className="block"
            />
          </div>
        </div>
        <div className=" bg-gray-200 mt-8">
          <div className="container  grid grid-cols-2 md:gap-y-4 gap-y-1   gap-x-5 sm:gap-x-8 md:grid-cols-4 py-4 md:py-8 font-medium text-gray-500 text-[0.5rem] leading-4 md:leading-6 md:text-sm">
            {data?.FooterBottom?.map((item: any) => (
              <Link target="_blank" href={item?.href || '#'} key={item?.id}>
                {item?.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
