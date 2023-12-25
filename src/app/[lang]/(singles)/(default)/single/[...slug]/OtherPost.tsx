'use client'
import { getStrapiImage } from '@/components/utils/api-helpers';
import useTrans from '@/hooks/useTranslate';
import Image from 'next/image';
import Link from 'next/link';

function OtherPost({ post }: { post: any }) {
  const lang = useTrans()

  return (
    <div className="  w-full h-fit  py-4">
      <div className="px-4 py-3 w-full space-x-4 flex flex-row items-center bg-[#E9EEF6] rounded-xl">
        <div className="min-w-[150px]  aspect-[3/2] relative">
          <Image
            alt={post?.data?.attributes?.thumbnailImage?.data?.attributes?.name}
            fill
            src={
              getStrapiImage(
                post?.data?.attributes?.thumbnailImage?.data?.attributes
              ) || ''
            }
            sizes="(max-width: 600px) 480px, 800px"
            className=" w-full h-full rounded-[0.25rem] object-cover !my-0"
          />
        </div>
        <div className="space-y-[0.38rem]">
          <div className="font-semibold text-[#212D39] line-clamp-2">
            {post?.data?.attributes?.title}
          </div>
          <div className="text-[#374151] text-xs line-clamp-2">
            {post?.data?.attributes?.description}
          </div>
          <Link
            href={`/${lang}/single/${post?.data?.attributes?.slug}` || '/'}
          >
            <div className="text-[0.875rem] font-semibold text-[#4594FF] cursor-pointer flex items-center">
              Xem thêm
              <span className="pl-[0.38rem] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="inline-block "
                >
                  <path
                    d="M2 8.00016L14 8.00016M14 8.00016L8.33333 13.6668M14 8.00016L8.33333 2.3335"
                    stroke="#4594FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OtherPost;
