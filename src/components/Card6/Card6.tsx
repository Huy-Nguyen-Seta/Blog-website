'use client';
import React, { FC } from 'react';
import PostCardMeta from '@/components/PostCardMeta/PostCardMeta';
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction';
import { PostDataType } from '@/data/types';
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiImage } from '../utils/api-helpers';
import useTrans from '@/hooks/useTranslate';

export interface Card6Props {
  className?: string;
  post: PostDataType;
}

const Card6: FC<Card6Props> = ({ className = 'h-full', post }) => {
  const {
    title,
    href,
    readingTime,
    featuredImage,
    tag,
    postType,
    thumbnailImage,
    like,
    slug,
    id,
    comments,
    viewCount
  } = post;
  const lang = useTrans();
  return (
    <div
      className={`nc-Card6 relative flex group flex-row items-center sm:p-4 sm:rounded-3xl sm:bg-white sm:dark:bg-neutral-900 sm:border border-neutral-200 dark:border-neutral-700 ${className}`}
    >
      <Link
        href={`/${lang}/news/${slug}` || ''}
        className="absolute inset-0 z-0"
      ></Link>
      <div className="flex flex-col flex-grow ">
        <div className="space-y-3 mb-4">
          <CategoryBadgeList categories={tag} />
          <h2 className={`block font-semibold text-sm sm:text-base`}>
            <Link
              href={`/${lang}/news/${slug}` || ''}
              className="line-clamp-2"
              title={title}
            >
              {title}
            </Link>
          </h2>
          <PostCardMeta meta={{ ...post }} />
        </div>
        <div className="flex items-center flex-wrap justify-between mt-auto">
          <PostCardLikeAndComment
            slug={slug}
            commentCount={comments?.length}
            blogId={id}
            likeCount={like}
            viewCount={viewCount}
            className="relative"
            isCard6={true}
          />
          <PostCardSaveAction
            postId={id}
            className="relative"
            readingTime={readingTime}
          />
        </div>
      </div>

      <Link
        href={`/${lang}/news/${slug}` || ''}
        className={`block relative flex-shrink-0  min-w-[35%] aspect-[6/5] sm:w-40  ms-3 sm:ms-5 rounded-2xl overflow-hidden z-0`}
      >
        <Image
          sizes="(max-width: 600px) 180px, 400px"
          className="object-cover w-full h-full"
          fill
          src={getStrapiImage(thumbnailImage) || ''}
          alt={thumbnailImage?.name || ''}
        />
        <span className="absolute bottom-1 start-1">
          <PostTypeFeaturedIcon
            wrapSize="h-7 w-7"
            iconSize="h-4 w-4"
            postType={postType}
          />
        </span>
      </Link>
    </div>
  );
};

export default Card6;
