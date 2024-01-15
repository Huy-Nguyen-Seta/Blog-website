'use client';

import { PostDataType } from '@/data/types';
import {
  PauseIcon,
  PlayIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { getStrapiImage } from '../utils/api-helpers';
import useTrans from '@/hooks/useTranslate';

export interface Card15PodcastProps {
  className?: string;
  post: PostDataType;
}

const Card15Podcast: FC<Card15PodcastProps> = ({
  className = 'h-full',
  post,
}) => {
  const { title, href, thumbnailImage, postType, date, slug } = post;
  const IS_AUDIO = postType === 'audio';
  const lang = useTrans()
  const renderDefaultBtnListen = (state?: 'playing') => {
    return (
      <div className="inline-flex items-center mt-3 pe-4 py-0.5 hover:ps-0.5 cursor-pointer rounded-full transition-all hover:bg-primary-50 dark:hover:bg-neutral-900">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 dark:bg-neutral-800 text-primary-6000 dark:text-primary-200">
          {state === 'playing' ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5 rtl:rotate-180" />
          )}
        </span>

        <span className="ms-3 text-xs sm:text-sm font-medium">
          {state === 'playing' ? 'Now playing' : 'Listen now'}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card15Podcast relative flex group items-center p-3 rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 ${className}`}
    >
      <div className="w-1/4 flex-shrink-0">
        <Link
          href={`/${lang}/news/${slug}` || ''}
          className="block h-0 aspect-w-1 aspect-h-1 relative rounded-full overflow-hidden shadow-lg"
        >
          <Image
            className="object-cover w-full h-full"
            src={getStrapiImage(thumbnailImage) || ''}
            fill
            alt={thumbnailImage?.name || ''}
            sizes="100px"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow ms-4">
        <h2 className={`nc-card-title block font-semibold text-sm sm:text-lg`}>
          <Link
            href={`/${lang}/news/${slug}` || ''}
            className={IS_AUDIO ? `line-clamp-1` : 'line-clamp-2'}
            title={title}
          >
            {title}
          </Link>
        </h2>
        <Link href={`/${lang}/news/${slug}` || ''}>
          <div
            className={
              'line-clamp-2 inline-flex items-center pe-4 py-0.5 hover:ps-0.5 cursor-pointer rounded-full transition-all hover:bg-primary-50 dark:hover:bg-neutral-900 select-none mt-1 p-2'
            }
          >
            <p className="text-xs sm:text-sm font-medium">
              {' '}
              Xem chi tiết
            </p>
            <ArrowRightCircleIcon className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 dark:bg-neutral-800 text-primary-6000 dark:text-primary-200 ms-3 " />
          </div>{' '}
        </Link>
      </div>
    </div>
  );
};

export default Card15Podcast;
