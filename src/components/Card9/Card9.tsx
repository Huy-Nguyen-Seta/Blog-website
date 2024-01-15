'use client';
import React, { FC } from 'react';
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction';
import { PostDataType } from '@/data/types';
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon';
import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { getStrapiImage } from '../utils/api-helpers';
import useTrans from '@/hooks/useTranslate';

export interface Card9Props {
  className?: string;
  ratio?: string;
  post: PostDataType;
  hoverClass?: string;
}

const Card9: FC<Card9Props> = ({
  className = 'h-full',
  ratio = 'aspect-w-3 aspect-h-3 sm:aspect-h-4',
  post,
  hoverClass = '',
}) => {
  const {
    title,
    href,
    thumbnailImage,
    tag,
    author,
    postType,
    createdAt,
    like,
    slug,
    id,
    comments,
    viewCount
  } = post;
  const lang = useTrans();
  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <div className="block ">
          <h2 className="block text-base sm:text-lg font-semibold text-white ">
            <span className="line-clamp-2" title={title}>
              {title}
            </span>
          </h2>
          <Link
            href={`/${lang}/news/author/${author?.slug}` || ''}
            className="flex mt-2.5 relative"
          >
            <span className="block text-neutral-200 hover:text-white font-medium truncate">
              {author?.name}
            </span>
            <span className="mx-[6px] font-medium">·</span>
            <span className="font-normal truncate">
              {moment(createdAt).format('MMM DD, YYYY')}
            </span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden z-0 ${hoverClass} ${className}`}
    >
      <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
        <PostCardLikeAndComment
          slug={slug}
          commentCount={comments?.length}
          blogId={id}
          likeCount={like}
          className="relative"
          viewCount={viewCount}
        />
        <PostCardSaveAction postId={id} hidenReadingTime className="relative" />
      </div>
      <div className={`flex items-start relative w-full ${ratio}`}></div>
      {postType === 'audio' ? (
        <div className="absolute inset-0">
          <PostFeaturedMedia post={post} />
        </div>
      ) : (
        <Link href={`/${lang}/news/${slug}` || ''}>
          <Image
            fill
            alt={thumbnailImage?.name || ''}
            className="object-cover w-full h-full rounded-3xl"
            src={getStrapiImage(thumbnailImage) || ''}
            sizes="(max-width: 600px) 480px, 500px"
          />
          <PostTypeFeaturedIcon
            className="absolute top-3 left-3 group-hover:hidden"
            postType={postType}
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          />
          <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Link>
      )}
      <Link
        href={`/${lang}/news/${slug}` || ''}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
        <Link
          href={`/${lang}/news/${slug}` || ''}
          className="absolute inset-0"
        ></Link>
        <div className="mb-3">
          <CategoryBadgeList categories={tag} />
        </div>
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card9;
