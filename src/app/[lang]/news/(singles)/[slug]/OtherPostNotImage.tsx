'use client';
import useTrans from '@/hooks/useTranslate';
import Link from 'next/link';

function OtherPostNotImage({ post }: { post: any }) {
  const lang = useTrans();

  return (
    <div className=" py-6 w-full h-fit">
      <div className="px-4 py-2 w-full space-x-4 flex flex-row items-center bg-[#dbedf9] rounded border-2 border-solid border-[#c3e5f8]">
        <div className="space-y-[0.38rem] flex flex-row space-x-2">
          <span className="font-semibold text-[#333333] min-w-fit">
            Tham khảo thêm:{' '}
            <Link
              href={
                `/${lang}/news/${post?.data?.attributes?.slug}` || '/'
              }
              className="!m-0 pl-2 font-normal text-[#0064c2] !no-underline"
            >
              {post?.data?.attributes?.title}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default OtherPostNotImage;
