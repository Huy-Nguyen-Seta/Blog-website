import React, { FC } from 'react';
import PostCardCommentBtn from '@/components/PostCardCommentBtn/PostCardCommentBtn';
import PostCardLikeAction from '@/components/PostCardLikeAction/PostCardLikeAction';
import PostCardView from '../PostCardView/PostCardView';

export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  hiddenCommentOnMobile?: boolean;
  useOnSinglePage?: boolean;
  likeCount?: number | any;
  blogId?: number | string;
  commentCount?: number;
  slug?: string;
  viewCount?: number;
  isCard6?: boolean;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = '',
  itemClass = 'px-1 md:px-3 h-8 text-xs',
  hiddenCommentOnMobile = true,
  useOnSinglePage = false,
  likeCount,
  blogId,
  commentCount,
  slug,
  viewCount = 0,
  isCard6= false
}) => {
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-0 md:space-x-2  rtl:space-x-reverse ${className}`}
    >
      <PostCardLikeAction
        blogId={blogId}
        className={itemClass}
        likeCount={likeCount}
      />
      <PostCardCommentBtn
        slug={slug}
        commentCount={commentCount}
        className={`flex ${itemClass}`}
        isATagOnSingle={useOnSinglePage}
        isCard6={isCard6}
      />
      <PostCardView viewCount={viewCount} className={"h-8 text-xs px-1 md:px-3  !min-w-[50px] !lg:min-w-[68px]"} />
    </div>
  );
};

export default PostCardLikeAndComment;
