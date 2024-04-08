'use client';
import React, { FC } from 'react';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import CommentCard from '@/components/CommentCard/CommentCard';
import { translateLanguage } from '@/utils/translateLanguage';
import useTrans from '@/hooks/useTranslate';

export interface SingleCommentListsProps {
  data: any[];
  onFetchComment?: () => void;
  total: number;
  loadMore: () => void;
  isLoadMore?: boolean;
  numberRest?: number;
}

const SingleCommentLists: FC<SingleCommentListsProps> = ({
  data,
  onFetchComment,
  total,
  loadMore,
  isLoadMore,
  numberRest,
}) => {
  const lang = useTrans();
  console.log('----data', data, total)
  return (
    <ul className="nc-SingleCommentLists space-y-5">
      {data?.map((item: any) => (
        <CommentCard
          postComment={item}
          onFetchComment={onFetchComment}
          key={item?.id}
        />
      ))}
      {isLoadMore && (
        <ButtonPrimary
          className="dark:bg-primary-700 w-full"
          onClick={loadMore}
        >
          {translateLanguage('watch_more', lang)}
          (+{numberRest} {translateLanguage('comment', lang)})
        </ButtonPrimary>
      )}
    </ul>
  );
};

export default SingleCommentLists;
