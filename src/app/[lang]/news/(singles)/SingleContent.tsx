'use client';

import PostCardCommentBtn from '@/components/PostCardCommentBtn/PostCardCommentBtn';
import PostCardLikeAction from '@/components/PostCardLikeAction/PostCardLikeAction';
import Tag from '@/components/Tag/Tag';
import { DEMO_TAGS } from '@/data/taxonomies';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { ArrowUpIcon, ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import { FC, useEffect, useRef, useState } from 'react';
import '@/styles/ckedit-styles.css';
import SingleAuthor from './SingleAuthor';
import OtherPost from './[slug]/OtherPost';
import Product from './[slug]/Product';
import OtherPostNotImage from './[slug]/OtherPostNotImage';
import { translateLanguage } from '@/utils/translateLanguage';
import useTrans from '@/hooks/useTranslate';

const demoTags = DEMO_TAGS.filter((_, i) => i < 9);
const regex = /((https:\/\/admin.hallo.co\/uploads\/)(?:(small)|(medium)|(large))?[^\.]+(\.[a-zA-Z]{3,4}))/g;   
export interface SingleContentProps {
  data?: any;
  content?: any;
  output?: any;
  isLoadMore?: boolean;
  setIsLoadMore?: (data: boolean) => void;
}

const SingleContent: FC<SingleContentProps> = ({
  data,
  content,
  output,
  isLoadMore,
  setIsLoadMore,
}) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLButtonElement>(null);
  //
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(true);
  //
  const lang = useTrans()
  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    threshold: 0,
    root: null,
    rootMargin: '0%',
    freezeOnceVisible: false,
  }) as any;
  useEffect(() => {
    const handleProgressIndicator = () => {
      const entryContent = contentRef.current;
      const progressBarContent = progressRef.current;

      if (!entryContent || !progressBarContent) {
        return;
      }

      const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight;
      let winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      let scrolled = (winScroll / totalEntryH) * 100;

      progressBarContent.innerText = scrolled.toFixed(0) + '%';

      if (scrolled >= 90) {
        setIsShowScrollToTop(true);
      } else {
        setIsShowScrollToTop(false);
      }
    };

    const handleProgressIndicatorHeadeEvent = () => {
      window?.requestAnimationFrame(handleProgressIndicator);
    };
    handleProgressIndicator();
    window?.addEventListener('scroll', handleProgressIndicatorHeadeEvent);
    return () => {
      window?.removeEventListener('scroll', handleProgressIndicatorHeadeEvent);
    };
  }, []);

  const showLikeAndCommentSticky =
    !endedAnchorEntry?.intersectionRatio &&
    (endedAnchorEntry?.boundingClientRect?.top || 0) > 0;
  return (
    <div className="relative">
      <div className="nc-SingleContent space-y-10">
        {/* ENTRY CONTENT */}
        <div
          id="single-entry-content ckEditor ck-content"
          className={`prose lg:prose-lg lg:prose-h2:my-8 lg:prose-h3:my-6 lg:prose-h1:my-10 !max-w-screen-md mx-auto dark:prose-invert ${
            isLoadMore ? 'max-h-96' : ''
          } overflow-hidden`}
          ref={contentRef}
        >
          {content?.map((item: any) => {
            switch (item?.__component) {
              case 'content.content':
                const convertImage = item?.content.replace(regex, "$1?format=webp")
                return (
                  <div
                    className="ck-content text-lg"
                    dangerouslySetInnerHTML={{ __html: convertImage }}
                  />
                );
              case 'content.link':
                return <OtherPost post={item?.blog} />;
              case 'content.content-product':
                return <Product products={item?.product} />;
              case 'content.single-link':
                return <OtherPostNotImage post={item?.blog} />;
              default:
                break;
            }
          })}
        </div>
        {isLoadMore && (
          <div
            className="animate-bounce cursor-pointer flex justify-center "
            onClick={() => setIsLoadMore?.(false)}
          >
            <div className=" hover:bg-slate-200 px-3 py-3 rounded-2xl space-x-3 flex justify-center items-center font-medium">
              <p className=""> {translateLanguage("watch_more", lang)}</p>
              <ChevronDoubleDownIcon height={18} width={18} />
            </div>
          </div>
        )}
        {/* TAGS */}
        {data?.tag?.data && (
          <div className="max-w-screen-md mx-auto flex flex-wrap">
            <Tag hideCount tag={data?.tag?.data} className="me-2 mb-2" />
          </div>
        )}
        {/* AUTHOR */}
        <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
        <div className="max-w-screen-md mx-auto ">
          <SingleAuthor author={data?.author?.data?.attributes} />
        </div>
        <div ref={endedAnchorRef}></div>
      </div>
      <div
        className={`sticky mt-8 bottom-8 z-40 justify-center ${
          showLikeAndCommentSticky ? 'flex' : 'hidden'
        }`}
      >
        <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-full ring-1 ring-offset-1 ring-neutral-900/5 p-1.5 flex items-center justify-center space-x-2 rtl:space-x-reverse text-xs">
          <PostCardLikeAction
            blogId={data?.id}
            likeCount={data?.like}
            className="px-3 h-9 text-xs"
          />
          <div className="border-s h-4 border-neutral-200 dark:border-neutral-700"></div>
          <PostCardCommentBtn
            isATagOnSingle
            commentCount={data?.comments?.data?.length || 0}
            className={` flex px-3 h-9 text-xs`}
          />
          <div className="border-s h-4 border-neutral-200 dark:border-neutral-700"></div>

          <button
            className={`w-9 h-9 items-center justify-center bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 rounded-full ${
              isShowScrollToTop ? 'flex' : 'hidden'
            }`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ArrowUpIcon className="w-4 h-4" />
          </button>

          <button
            ref={progressRef}
            className={`w-9 h-9 items-center justify-center ${
              isShowScrollToTop ? 'hidden' : 'flex'
            }`}
            title="Lên đầu trang"
          >
            %
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleContent;
