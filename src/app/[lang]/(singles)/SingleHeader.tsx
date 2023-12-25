'use client';

import React, { FC } from 'react';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import SingleTitle from './SingleTitle';
import PostMeta2 from '@/components/PostMeta2/PostMeta2';
import SingleMetaAction2 from './SingleMetaAction2';
import { DEMO_CATEGORIES } from '@/data/taxonomies';

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  data?: any;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = '',
  data,
}) => {
  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <CategoryBadgeList itemClass="!px-3" categories={data?.tags} />
          <SingleTitle mainClass={titleMainClass} title={data?.title} />
          {!hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {data?.description}
            </span>
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
            <PostMeta2
              meta={data}
              size="large"
              className="leading-none flex-shrink-0"
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
            />
            <SingleMetaAction2 data={data}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
