import React, { FC } from 'react';
import PostCardCommentBtn from '@/components/PostCardCommentBtn/PostCardCommentBtn';
import PostCardLikeAction from '@/components/PostCardLikeAction/PostCardLikeAction';

export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  hiddenCommentOnMobile?: boolean;
  useOnSinglePage?: boolean;
  likeCount?: number | any;
  blogId?: number | string;
  commentCount?: number;
  slug?: string;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = '',
  itemClass = 'px-3 h-8 text-xs',
  hiddenCommentOnMobile = true,
  useOnSinglePage = false,
  likeCount,
  blogId,
  commentCount,
  slug,
}) => {
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 rtl:space-x-reverse ${className}`}
    >
      <PostCardLikeAction
        blogId={blogId}
        className={itemClass}
        likeCount={likeCount}
      />
      <PostCardCommentBtn
        slug={slug}
        commentCount={commentCount}
        className={`${
          hiddenCommentOnMobile ? 'hidden sm:flex' : 'flex'
        }  ${itemClass}`}
        isATagOnSingle={useOnSinglePage}
      />
    </div>
  );
};

export default PostCardLikeAndComment;
