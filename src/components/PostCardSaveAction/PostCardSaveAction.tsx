import React, { FC } from 'react';
import NcBookmark from '../NcBookmark/NcBookmark';

export interface PostCardSaveActionProps {
  className?: string;
  bookmarkClass?: string;
  readingTime?: number;
  hidenReadingTime?: boolean;
  postId?: string | number;
}

const PostCardSaveAction: FC<PostCardSaveActionProps> = ({
  className = '',
  bookmarkClass,
  hidenReadingTime = true,
  readingTime = 3,
  postId
}) => {
  return (
    <div
      className={`nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 ${className}`}
    >
      {!hidenReadingTime && !!readingTime && (
        <span>{readingTime} min read</span>
      )}

      <NcBookmark postId={postId} containerClassName={bookmarkClass} />
    </div>
  );
};

export default PostCardSaveAction;
