'use client';

import React, { FC, useState } from 'react';
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction';
import { PostDataType } from '@/data/types';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment';
import PostCardMeta from '@/components/PostCardMeta/PostCardMeta';
import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia';
import Link from 'next/link';
import moment from 'moment';
import useTrans from '@/hooks/useTranslate';

export interface Card11Props {
  className?: string;
  post: PostDataType;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11: FC<Card11Props> = ({
  className = 'h-full',
  post,
  hiddenAuthor = false,
  ratio = 'aspect-w-4 aspect-h-3',
}) => {
  
  const { title, href, tag, createdAt, like, slug, id, comments, viewCount, createdDate } = post;
  const lang = useTrans();
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={`nc-Card11 relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      >
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>
      </div>
      <Link
        href={`/${lang}/news/${slug}` || ''}
        className="absolute inset-0"
      ></Link>
      <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeList categories={ tag?.data || tag} />
      </span>

      <div className="p-4 flex flex-col space-y-3">
        {!hiddenAuthor ? (
          <PostCardMeta meta={post} />
        ) : (
          <span className="text-xs text-neutral-500">
            {moment(createdDate || createdAt).format('MMM DD, YYYY')}
          </span>
        )}
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={`/${lang}/news/${slug}`}>
            <span className="line-clamp-2" title={title}>
              {title}
            </span>
          </Link>
        </h3>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment
            slug={slug}
            commentCount={comments?.length || 0}
            blogId={id}
            likeCount={like}
            className="relative"
            viewCount={viewCount}
          />
          <PostCardSaveAction postId={id} className="relative" />
        </div>
      </div>
    </div>
  );
};

export default Card11;
