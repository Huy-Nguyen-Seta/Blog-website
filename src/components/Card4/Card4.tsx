import React, { FC } from 'react';
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction';
import { PostDataType } from '@/data/types';
import CardAuthor2 from '@/components/CardAuthor2/CardAuthor2';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiImage } from '../utils/api-helpers';
import moment from 'moment';

export interface Card4Props {
  className?: string;
  post: PostDataType;
}

const Card4: FC<Card4Props> = ({ className = 'h-full', post }) => {
  const {
    title,
    href,
    thumbnailImage,
    tag,
    author,
    readingTime,
    createdAt,
    createdDate
  } = post;

  return (
    <div
      className={`nc-Card4 relative flex flex-col group bg-white dark:bg-neutral-900 rounded-3xl ${className}`}
    >
      <span className="block flex-shrink-0 relative w-full aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden">
        <Image
          fill
          className="object-cover"
          alt={thumbnailImage?.name  || ''}
          sizes="(max-width: 600px) 480px, 800px"
          src={getStrapiImage(thumbnailImage) || ''}
        />
      </span>

      <Link href={href || ''} className="absolute inset-0"></Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="space-y-2.5 mb-4">
          <CategoryBadgeList categories={tag} />
          <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
            <Link href={href || ''} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h2>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <CardAuthor2
            readingTime={readingTime}
            date={moment(createdDate || createdAt).format('MMM DD, YYYY')}
            author={author}
          />
          <PostCardSaveAction hidenReadingTime />
        </div>
      </div>
    </div>
  );
};

export default Card4;
