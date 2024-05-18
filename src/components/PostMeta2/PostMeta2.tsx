'use client'
import Avatar from '@/components/Avatar/Avatar';
import { DEMO_POSTS } from '@/data/posts';
import { PostDataType } from '@/data/types';
import moment from 'moment';
import Link from 'next/link';
import { FC } from 'react';
import { getStrapiImage } from '../utils/api-helpers';
import useTrans from '@/hooks/useTranslate';

const metaDemo: PostMeta2Props['meta'] = DEMO_POSTS[0];

export interface PostMeta2Props {
  className?: string;
  meta?: Pick<PostDataType, 'date' | 'author' | 'categories' | 'readingTime' | 'createdAt' | 'createdDate'>;
  hiddenCategories?: boolean;
  size?: 'large' | 'normal';
  avatarRounded?: string;
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = 'leading-none',
  meta = metaDemo,
  hiddenCategories = false,
  size = 'normal',
  avatarRounded,
}) => {
  const lang = useTrans()
  const { author, readingTime, createdAt, createdDate } = meta;
  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === 'normal' ? 'text-xs' : 'text-sm'
      } ${className}`}
    >
      <Link
        href={`/${lang}/news/author/${author?.data?.attributes?.slug }`}
        className="flex items-center space-x-2 rtl:space-x-reverse"
      >
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === 'normal'
              ? 'h-6 w-6 text-sm'
              : 'h-10 w-10 sm:h-11 sm:w-11 text-xl'
          }
          imgUrl={
            getStrapiImage(author?.data?.attributes?.image?.data?.attributes) ||
            ''
          }
          userName={author?.data?.attributes?.name}
        />
      </Link>
      <div className="ms-3">
        <div className="flex items-center">
          <Link
        href={`/${lang}/news/author/${author?.data?.attributes?.slug }`}
        className="block font-semibold"
          >
            {author?.data?.attributes?.name}
          </Link>

          {/* {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ms-0">
                <span className="text-xs">🏷 </span>
                {tags?.map((cat, index) => (
                  <Link key={cat.id} href={cat.href || ''} className="font-semibold">
                    {cat.name}
                    {index < tags.length - 1 && <span>, </span>}
                  </Link>
                ))}
              </div>
            </>
          )} */}
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">
            {' '}
            {moment(createdDate || createdAt).format('MMM DD, YYYY')}
          </span>
          {/* <span className="mx-2 font-semibold">·</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            {readingTime} min read
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default PostMeta2;
