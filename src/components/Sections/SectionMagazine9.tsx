import Card15Podcast from '@/components/Card15Podcast/Card15Podcast';
import Card9 from '@/components/Card9/Card9';
import Heading from '@/components/Heading/Heading';
import { DEMO_POSTS_AUDIO } from '@/data/posts';
import { PostDataType } from '@/data/types';
import React, { FC } from 'react';

export interface SectionMagazine9Props {
  posts?: any[];
  className?: string;
  gapClassName?: string;
  heading?: string;
  desc?: string;
  cate?: any
}

const SectionMagazine9: FC<SectionMagazine9Props> = ({
  posts,
  className = '',
  gapClassName = 'gap-6 md:gap-8',
  heading = 'Listen to audio live',
  desc,
  cate
}) => {
  const tag1 = Object.values(posts?.[0] || [])?.[0] as any[];
  const tag2 = Object.values(posts?.[1] || [])?.[0] as any[];
  const tag3 = Object.values(posts?.[2] || [])?.[0] as any[];

  return (
    <div className={`nc-SectionMagazine9 relative ${className}`}>
      {heading && <Heading urlMore={`archive/${cate?.slug}`}  description={desc}>{heading}</Heading>}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName}`}
      >
        {tag1?.[0] && <Card9 ratio="aspect-w-4 aspect-h-3" post={tag1?.[0]} />}
        {tag2?.[0] && <Card9 ratio="aspect-w-4 aspect-h-3" post={tag2?.[0]} />}
        {tag3?.[0] && <Card9 ratio="aspect-w-4 aspect-h-3" post={tag3?.[0]} />}
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName} mt-8`}
      >
        <div className="flex group items-center space-y-8 h-full flex-col">
          {(tag1 || [])
            ?.filter((_, i) => i > 0 && i < 3)
            ?.map((p, index) => (
              <Card15Podcast key={index} post={p} />
            ))}
        </div>
        <div className="flex group items-center space-y-8 h-full flex-col">
          {(tag2 || [])
            ?.filter((_, i) => i > 0 && i < 3)
            ?.map((p, index) => (
              <Card15Podcast key={index} post={p} />
            ))}
        </div>
        <div className="flex group items-center space-y-8 h-full flex-col">
          {(tag3 || [])
            ?.filter((_, i) => i > 0 && i < 3)
            ?.map((p, index) => (
              <Card15Podcast key={index} post={p} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine9;
