'use client';

import React, { FC, useState } from 'react';
import Nav from '@/components/Nav/Nav';
import NavItem from '@/components/NavItem/NavItem';
import Button from '../Button/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import useTrans from '@/hooks/useTranslate';
import Link from 'next/link';
import { translateLanguage } from '@/utils/translateLanguage';

export interface HeaderFilterProps {
  tabs?: any[];
  heading: string;
  tabActive: string | number;
  setTabActive: (value: string) => void;
}

const HeaderFilterCustom: FC<HeaderFilterProps> = ({
  tabs = ['All items', 'Garden', 'Fitness', 'Design'],
  tabActive,
  setTabActive,
}) => {
  const lang = useTrans();
  const handleClickTab = (item: any) => {
    if (item?.id === tabActive) {
      return;
    }
    setTabActive(item);
  };

  return (
    <div className="flex flex-col mb-8 relative">
      <div className="flex justify-between">
        <Nav
          className="sm:space-x-2 rtl:space-x-reverse"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
        >
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActive === item?.id}
              onClick={() => handleClickTab(item?.id)}
            >
              {item?.name}
            </NavItem>
          ))}
        </Nav>
        <Button pattern="white" sizeClass="px-6" className="!hidden md:!block">
          <Link href={`/${lang}/news/list`} className=" md:!flex">
            <span> {translateLanguage('watch_more', lang)}</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderFilterCustom;
