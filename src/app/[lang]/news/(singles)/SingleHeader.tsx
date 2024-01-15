'use client';

import React, { FC, useEffect } from 'react';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import SingleTitle from './SingleTitle';
import PostMeta2 from '@/components/PostMeta2/PostMeta2';
import SingleMetaAction2 from './SingleMetaAction2';
import { useDispatch } from 'react-redux';
import useTrans from '@/hooks/useTranslate';
import { fetchStorageByIdUser } from '@/app/GlobalRedux/action';
import { AppDispatch } from '@/app/GlobalRedux/store';

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
  const lang = useTrans();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    let user;
    if (localStorage.getItem('userInfor'))
      user = JSON.parse(localStorage.getItem('userInfor') || '');
    if (user) dispatch(fetchStorageByIdUser({ userId: user?._id, lang: lang }));
  }, [lang, dispatch]);
  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          {data?.tag?.data && (
            <CategoryBadgeList itemClass="!px-3" categories={data?.tag?.data} />
          )}
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
            <SingleMetaAction2 data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
