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
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {(categories?.data || categories)?.map((item: any, index: number) => (
        <Badge
          className={itemClass}
          key={index}
          name={item?.tagName || item?.attributes?.tagName}
          href={
            `/${lang}/archive/tags/${item?.slug || item?.attributes?.slug}` ||
            '/'
          }
          color={item?.color || (item?.attributes?.color as any)}
        />
      ))}
    </div>
  );
};

export default CategoryBadgeList;
