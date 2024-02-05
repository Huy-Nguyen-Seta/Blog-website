import { PostDataType } from '@/data/types';
import useTrans from '@/hooks/useTranslate';
import moment from 'moment';
import Link from 'next/link';
import { FC, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia';
import { getStrapiImage } from '../utils/api-helpers';

export interface CardPartner {
  className?: string;
  post: PostDataType;
  ratio?: string;
}

const CardPartner: FC<CardPartner> = ({
  className = 'h-full',
  post,
  ratio = 'aspect-w-4 aspect-h-3',
}) => {
  const { name, thumbnailImage, createdDate, slug, description } = post;
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
          <PostFeaturedMedia newLink={`/${lang}/news/partner/${slug}` || ''} post={post} isHover={isHover} />
        </div>
      </div>
      <Link
        href={`/${lang}/news/partner/${slug}` || ''}
        className="absolute inset-0"
      ></Link>

      <div className="p-4 flex flex-col space-y-3">
        <div className="flex flex-row md:space-x-4 space-x-2 items-center">
          <Link
            href={`/${lang}/news/partner/${slug}` || ''}
            className="relative flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Avatar
              radius="rounded-full"
              imgUrl={getStrapiImage(thumbnailImage) || ''}
              userName={''}
              sizeClass="h-7 w-7 text-sm"
            />
          </Link>
          <span className="text-xs text-neutral-500">
            Ngày cập nhật :{' '}
            {moment(createdDate || new Date()).format('DD MM, YYYY')}
          </span>
        </div>
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={`/${lang}/news/partner/${slug}`}>
            <span className="line-clamp-2">{name}</span>
          </Link>
        </h3>
        <span className="block text-neutral-500 dark:text-neutral-400 text-[15px] leading-6">
          {description}
        </span>
      </div>
    </div>
  );
};

export default CardPartner;
