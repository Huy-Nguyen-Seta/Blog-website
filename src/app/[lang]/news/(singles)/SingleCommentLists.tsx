import React, { FC } from 'react';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import CommentCard from '@/components/CommentCard/CommentCard';

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
          Xem thêm (+{numberRest} bình luận)
        </ButtonPrimary>
      )}
    </ul>
  );
};

export default SingleCommentLists;
