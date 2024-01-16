'use client';

import React, { FC } from 'react';
import PostActionDropdown from '@/components/PostActionDropdown/PostActionDropdown';
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment';
import { SOCIALS_DATA } from '@/components/SocialsShare/SocialsShare';
import NcDropDown from '@/components/NcDropDown/NcDropDown';
import NcBookmark from '@/components/NcBookmark/NcBookmark';
import useTrans from '@/hooks/useTranslate';

export interface SingleMetaAction2Props {
  className?: string;
  data?: any;
}

const SingleMetaAction2: FC<SingleMetaAction2Props> = ({
  className = '',
  data,
}) => {
  const handleOnClick = (e: any) => {
    e.preventDefault();
    if (navigator.share) {
      navigator
        .share({
          title: `${data?.title}`,
          url: document.location.href,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch((error) => {
          console.error('Something went wrong sharing the blog', error);
        });
    }
  };
  const lang = useTrans();
  return (
    <div className={`nc-SingleMetaAction2 ${className}`}>
      <div className="flex flex-row md:space-x-2.5 space-x-0.5 rtl:space-x-reverse items-center">
        <PostCardLikeAndComment
          itemClass="px-4 h-9 text-sm"
          hiddenCommentOnMobile
          useOnSinglePage
          className="!md:space-x-2.5 !space-x-1 rtl:!space-x-reverse"
          likeCount={data?.like}
          blogId={data?.id}
          commentCount={data?.comments?.data?.length}
          viewCount={data?.viewCount}
        />
        <div className="px-1">
          <div className="border-s border-neutral-200 dark:border-neutral-700 h-6" />
        </div>

        <NcBookmark
          postId={data?.id}
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
        />
        <NcDropDown
          className="flex-shrink-0 hidden md:flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
          renderTrigger={() => (
            <svg
              fill="none"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <path
                    d="M512,241.7L273.643,3.343v156.152c-71.41,3.744-138.015,33.337-188.958,84.28C30.075,298.384,0,370.991,0,448.222v60.436
			l29.069-52.985c45.354-82.671,132.173-134.027,226.573-134.027c5.986,0,12.004,0.212,18.001,0.632v157.779L512,241.7z
			 M255.642,290.666c-84.543,0-163.661,36.792-217.939,98.885c26.634-114.177,129.256-199.483,251.429-199.483h15.489V78.131
			l163.568,163.568L304.621,405.267V294.531l-13.585-1.683C279.347,291.401,267.439,290.666,255.642,290.666z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </svg>
          )}
          onClick={() => {}}
          data={SOCIALS_DATA}
          url={
            window
              ? window?.location.origin + `/${lang}/news` + '/' + data?.slug
              : '#'
          }
        />
        <button
          onClick={handleOnClick}
          className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-6000 dark:text-neutral-300 rounded-full md:hidden"
        >
          <svg
            fill="none"
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <g>
                <path
                  d="M512,241.7L273.643,3.343v156.152c-71.41,3.744-138.015,33.337-188.958,84.28C30.075,298.384,0,370.991,0,448.222v60.436
			l29.069-52.985c45.354-82.671,132.173-134.027,226.573-134.027c5.986,0,12.004,0.212,18.001,0.632v157.779L512,241.7z
			 M255.642,290.666c-84.543,0-163.661,36.792-217.939,98.885c26.634-114.177,129.256-199.483,251.429-199.483h15.489V78.131
			l163.568,163.568L304.621,405.267V294.531l-13.585-1.683C279.347,291.401,267.439,290.666,255.642,290.666z"
                  fill="currentColor"
                />
              </g>
            </g>
          </svg>
        </button>

        <PostActionDropdown
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          iconClass="h-5 w-5"
          url={window ? window?.location.origin + '/news/' + data?.slug : '#'}
        />
      </div>
    </div>
  );
};

export default SingleMetaAction2;
