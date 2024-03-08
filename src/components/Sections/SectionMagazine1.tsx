import React, { FC } from 'react';
import Card2 from '@/components/Card2/Card2';
import { PostDataType } from '@/data/types';
import Card6 from '@/components/Card6/Card6';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { translateLanguage } from '@/utils/translateLanguage';

export interface SectionMagazine1Props {
  posts: any[];
  heading?: string;
  className?: string;
  categories?: any[];
  desc?: string;
  lang?: Language;
}

const SectionMagazine1: FC<SectionMagazine1Props> = ({
  posts,
  heading = ' ',
  desc,
  className = '',
  lang,
}) => {
  return (
    <div className={`nc-SectionMagazine1 ${className}`}>
      {heading && <Heading description={desc}>{heading}</Heading>}
      {!posts?.length && <span>{translateLanguage('emty_list', lang || 'vi')}</span>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {posts?.[0] && (
          <Card2
            subClassName="!h-auto aspect-[6/5] w-full"
            size="large"
            post={posts?.[0]}
          />
        )}
        <div className="grid gap-6 md:gap-8">
          {posts
            ?.filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card6 key={index} post={item} />
            ))}
        </div>
      </div>
      <div className="w-full  justify-center md:!hidden !flex pt-8">
        <Button pattern="primary" sizeClass="px-6" className=" w-fit py-2">
          <Link href={`/${lang}/news/${'list'}`} className="flex">
            <span> {translateLanguage('watch_more', lang || 'vi')}</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180 r-0" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SectionMagazine1;
