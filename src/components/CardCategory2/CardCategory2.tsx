import React, { FC } from 'react';
import NcImage from '@/components/NcImage/NcImage';
import { TaxonomyType, TwMainColor } from '@/data/types';
import Badge from '@/components/Badge/Badge';
import Link from 'next/link';
import { getStrapiImage } from '../utils/api-helpers';
import useTrans from '@/hooks/useTranslate';
import { ScaleLevel } from '@/interface/Strapi';
import { translateLanguage } from '@/utils/translateLanguage';

export interface CardCategory2Props {
  className?: string;
  taxonomy: TaxonomyType;
  index?: string;
}

const CardCategory2: FC<CardCategory2Props> = ({
  className = '',
  taxonomy,
  index,
}) => {
  const lang = useTrans();
  const { name, thumbnail, image, slug = '/' } = taxonomy;
  const colorArr = [
    'pink',
    'green',
    'yellow',
    'red',
    'indigo',
    'blue',
    'purple',
    'gray',
  ];
  return (
    <Link
      href={`/${lang}/news/archive/${slug}` || '/'}
      className={`nc-CardCategory2 relative flex flex-col items-center justify-center text-center px-3 py-5 sm:p-6 bg-white dark:bg-neutral-900 rounded-3xl transition-colors ${className}`}
    >
      {/* {index && (
        <Badge
          color={
            colorArr[Math.floor(Math.random() * colorArr.length)] as TwMainColor
          }
          name={index}
          className="absolute -top-2 sm:top-3 left-3"
        />
      )} */}
      <NcImage
        containerClassName={`relative flex-shrink-0 w-20 h-20 rounded-full shadow-lg overflow-hidden z-0`}
        src={getStrapiImage(image || thumbnail, ScaleLevel.EXTRA_LARGE) || ''}
        fill
        alt="categories"
        className="object-cover "
      />
      <div className="mt-3">
        <h2 className={`text-base font-semibold`}>{name}</h2>
        <span
          className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {taxonomy?.blogs?.count || 0} {translateLanguage('post', lang)}
        </span>
      </div>
    </Link>
  );
};

export default CardCategory2;
