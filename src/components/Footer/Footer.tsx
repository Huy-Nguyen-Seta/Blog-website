import React from 'react';
import Logo from '@/components/Logo/Logo';
import SocialsList1 from '@/components/SocialsList1/SocialsList1';
import { CustomLink } from '@/data/types';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import { getData } from '../utils/fetch-api';
import Image from 'next/image';

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
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu?.groupName}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu?.items.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
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
      <div className="nc-Footer relative pt-16 lg:pt-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
            <div className="flex flex-row items-start  space-x-4 pr-8">
              <Image
                alt="Hallo"
                src={'/image/bct.png'}
                width={140}
                height={140}
                className="block dark:hidden"
              />
              <Image
                alt="Hallo"
                src={'/image/dmca.png'}
                width={140}
                height={140}
                className="block dark:hidden"
              />
            </div>
          </div>
          {(data?.Footer || [])?.map(renderWidgetMenuItem)}
        </div>
        <div className=" bg-gray-200 mt-8">
          <div className="container  grid grid-cols-2 gap-y-4  sm:gap-x-8 md:grid-cols-4  py-8 font-medium text-gray-500">
            {data?.SubFooter?.map((item: any) => (
              <div key={item?.id}>{item?.groupName}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
