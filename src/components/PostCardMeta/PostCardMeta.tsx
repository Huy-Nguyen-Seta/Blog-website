'use client';
import React, { FC, useEffect, useState } from 'react';
import Avatar from '@/components/Avatar/Avatar';
import { PostDataType } from '@/data/types';
import Link from 'next/link';
import { getStrapiImage } from '../utils/api-helpers';
import moment from 'moment';
import useTrans from '@/hooks/useTranslate';

export interface PostCardMetaProps {
  className?: string;
  meta: Pick<PostDataType, 'createdAt' | 'author'>;
  hiddenAvatar?: boolean;
  avatarSize?: string;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = 'leading-none text-xs',
  meta,
  hiddenAvatar = false,
  avatarSize = 'h-7 w-7 text-sm',
}) => {
  const lang = useTrans();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { createdAt, author } = meta;
  const currentAuthor = author?.data ? author?.data?.attributes : author;
  const authorImage = currentAuthor?.image?.data
    ? currentAuthor?.image?.data?.attributes
    : currentAuthor?.image;
  return isClient ? (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <Link
        href={`/${lang}/news/author/${currentAuthor?.slug}` || ''}
        className="relative flex items-center space-x-2 rtl:space-x-reverse"
      >
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={avatarSize}
            imgUrl={getStrapiImage(authorImage) || ''}
            userName={currentAuthor?.name}
          />
        )}
        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {currentAuthor?.name}
        </span>
      </Link>
      <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
        ·
      </span>
      <span className="text-neutral-500 dark:text-neutral-400 font-normal">
        {moment(createdAt).format('MMM DD, YYYY')}
      </span>
    </div>
  ) : (
    <div></div>
  );
};

export default PostCardMeta;
