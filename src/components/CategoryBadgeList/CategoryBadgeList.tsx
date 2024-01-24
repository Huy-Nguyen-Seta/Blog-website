'use client';
import { PostDataType } from '@/data/types';
import React, { FC } from 'react';
import Badge from '@/components/Badge/Badge';
import useTrans from '@/hooks/useTranslate';

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: any;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = 'flex flex-wrap space-x-2',
  itemClass,
  categories,
}) => {
  const lang = useTrans();
  return (
    categories && (
      <div
        className={`nc-CategoryBadgeList ${className}`}
        data-nc-id="CategoryBadgeList"
      >
        <Badge
          className={itemClass}
          name={categories?.tagName || categories?.attributes?.tagName}
          href={
            `/${lang}/news/archive/tags/${
              categories?.slug || categories?.attributes?.slug
            }` || '/'
          }
          color={categories?.color || (categories?.attributes?.color as any)}
        />
      </div>
    )
  );
};

export default CategoryBadgeList;
