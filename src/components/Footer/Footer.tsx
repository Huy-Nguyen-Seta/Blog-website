import React from 'react';
import Logo from '@/components/Logo/Logo';
import SocialsList1 from '@/components/SocialsList1/SocialsList1';
import { CustomLink } from '@/data/types';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import { getData } from '../utils/fetch-api';

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '5',
    title: 'Về HALLO',
    menus: [
      { href: '#', label: 'Tin tức' },
      { href: '#', label: 'Nhà tuyển dụng' },
      { href: '#', label: 'Nhà đầu tư' },
      { href: '#', label: 'Tìm cửa hàng' },
    ],
  },
  {
    id: '1',
    title: 'Thông tin và chính sách',
    menus: [
      { href: '#', label: 'Chính sách bán hàng' },
      { href: '#', label: 'Bảo hành' },
      { href: '#', label: 'Giao hàng' },
      { href: '#', label: 'Liên hệ với chúng tôi' },
    ],
  },
  {
    id: '2',
    title: 'Phương thức thanh toán',
    menus: [
      { href: '#', label: 'Combini' },
      { href: '#', label: 'Chuyển khoản' },
      { href: '#', label: 'Thanh toán trực tiếp tại văn phòng' },
    ],
  },
  {
    id: '4',
    title: 'Dịch vụ và các thông tin khác',
    menus: [
      { href: '#', label: 'Hỗ trợ mua hàng' },
      { href: '#', label: 'Chăm sóc khách hàng' },
      { href: '#', label: 'Hồ sơ sau mua' },
      { href: '#', label: 'Góp ý và khiếu lại' },
    ],
  },
];

const Footer = async ({ lang }: { lang: Language }) => {
  const data = await getData(lang, '/getFooter');
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
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
      <div className="nc-Footer relative py-16 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
          </div>
          {(data || [])?.map(renderWidgetMenuItem)}
        </div>
      </div>
    </>
  );
};

export default Footer;
