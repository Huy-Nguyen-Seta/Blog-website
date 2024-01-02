import React, { FC } from 'react';
import NcImage from '@/components/NcImage/NcImage';
import { TaxonomyType } from '@/data/types';
import Link from 'next/link';
import { getStrapiImage } from '../utils/api-helpers';
import useTrans from '@/hooks/useTranslate';

export interface CardCategory1Props {
  className?: string;
  taxonomy: TaxonomyType;
  size?: 'large' | 'normal';
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = '',
  size = 'normal',
  taxonomy,
}) => {
  const lang = useTrans();
  const { count, name, slug = '/', image, blogs } = taxonomy;
  return (
    <Link
      href={`/${lang}/news/archive/${slug}` || '/'}
      className={`nc-CardCategory1 flex items-center ${className}`}
    >
      <NcImage
        alt=""
        containerClassName={`relative flex-shrink-0 ${
          size === 'large' ? 'w-20 h-20' : 'w-12 h-12'
        } rounded-lg me-4 overflow-hidden`}
        src={getStrapiImage(image) || ''}
        fill
        className="object-cover"
        sizes="80px"
      />
      <div>
        <h2
          className={`${
            size === 'large' ? 'text-lg' : 'text-base'
          } nc-card-title text-neutral-900 dark:text-neutral-100 text-sm sm:text-base font-medium sm:font-semibold`}
        >
          {name}
        </h2>
        <span
          className={`${
            size === 'large' ? 'text-sm' : 'text-xs'
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {blogs?.count} Bài viết
        </span>
      </div>
    </Link>
  );
};

export default CardCategory1;
