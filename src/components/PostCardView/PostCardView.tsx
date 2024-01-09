import convertNumbThousand from '@/utils/convertNumbThousand';
import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';

function PostCardView({
  viewCount,
  className,
}: {
  viewCount: number;
  className?: string;
}) {
  return (
    <button
      className={`nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 
      ${className}`}
      title="Lượt xem"
    >
      <EyeIcon height={18} width={18} />

      <span className={`ml-1 text-neutral-900 dark:text-neutral-200`}>
        {convertNumbThousand(viewCount ? viewCount : 0)}
      </span>
    </button>
  );
}

export default PostCardView;
