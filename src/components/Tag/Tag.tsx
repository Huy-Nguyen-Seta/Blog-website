import { TaxonomyType } from '@/data/types';
import useTrans from '@/hooks/useTranslate';
import Link from 'next/link';
import React, { FC } from 'react';

export interface TagProps {
  className?: string;
  tag: TaxonomyType;
  hideCount?: boolean;
}

const Tag: FC<TagProps> = ({ className = '', tag, hideCount = false }) => {
  const lang = useTrans();
  return (
    <Link
      className={`nc-Tag inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg md:py-2.5 md:px-4 dark:bg-neutral-900 ${className}`}
      href={`/${lang}/archive/tags/${tag?.slug || tag?.attributes?.slug}`}
    >
      {`${tag?.attributes?.tagName || tag?.tagName}`}
      {!hideCount && (
        <span className="text-xs font-normal"> ({tag?.blogs?.count})</span>
      )}
    </Link>
  );
};

export default Tag;
