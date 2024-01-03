'use client';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment';
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction';
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon';
import { PostDataType } from '@/data/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import PostCardMeta from '../PostCardMeta/PostCardMeta';
import { getStrapiImage } from '../utils/api-helpers';
import useTrans from '@/hooks/useTranslate';

export interface Card2Props {
  className?: string;
  post: PostDataType;
  size?: 'normal' | 'large';
}

const Card2: FC<Card2Props> = ({
  className = 'h-full',
  size = 'normal',
  post,
}) => {
  const {
    title,
    href,
    readingTime,
    featuredImage,
    description,
    categories,
    postType,
    thumbnailImage,
    tags,
    like,
    slug,
    id,
    comments,
  } = post;
  const lang = useTrans();
  return (
    <div className={`nc-Card2 group relative flex flex-col ${className}`}>
      <div className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] z-0">
        <Image
          fill
          sizes="(max-width: 600px) 480px, 800px"
          className="object-cover rounded-3xl aspect-[3/2]"
          src={getStrapiImage(thumbnailImage) || ''}
          alt={thumbnailImage?.name}
        />
        <PostTypeFeaturedIcon
          className="absolute bottom-2 left-2"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
        <CategoryBadgeList
          className="flex flex-wrap space-x-2 absolute top-3 left-3"
          itemClass="relative"
          categories={tags}
        />
      </div>

      <Link
        href={`/${lang}/news/single/${slug}` || ''}
        className="absolute inset-0"
      />

      <div className="mt-5 px-4 flex flex-col">
        <div className="space-y-3">
          <PostCardMeta
            className="relative text-sm"
            avatarSize="h-8 w-8 text-sm"
            meta={post}
          />

          <h2
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 ${
              size === 'large' ? 'text-base sm:text-lg md:text-xl' : 'text-base'
            }`}
          >
            <Link
              href={`/${lang}/news/single/${slug}` || ''}
              className="line-clamp-2"
              title={title}
            >
              {title}
            </Link>
          </h2>
          <span className="block text-neutral-500 dark:text-neutral-400 text-[15px] leading-6 ">
            {description}
          </span>
        </div>
        <div className="my-5 border-t border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex items-center justify-between">
          <PostCardLikeAndComment
            commentCount={comments?.length}
            blogId={id}
            likeCount={like}
            className="relative"
            slug={slug}
          />
          <PostCardSaveAction
            postId={id}
            className="relative"
            readingTime={readingTime}
          />
        </div>
      </div>
    </div>
  );
};

export default Card2;
