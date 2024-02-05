'use client';
import { getStrapiImage } from '@/components/utils/api-helpers';
import useTrans from '@/hooks/useTranslate';
import { ScaleLevel } from '@/interface/Strapi';
import moment from 'moment';
import Image from 'next/image';
import SingleTitle from '../../(singles)/SingleTitle';

function Content(response: any) {
  const data = response?.response?.attributes;
  const lang = useTrans();
  return (
    <div>
      <header className="relative container ">
        <div className="bg-white dark:bg-neutral-900 shadow-2xl px-5 py-7 md:p-11 rounded-2xl md:rounded-[40px] flex flex-col sm:flex-row items-center justify-start space-y-10 sm:space-y-0 sm:space-x-11 rtl:space-x-reverse">
          <div className="w-1/2 sm:w-1/4 flex-shrink-0">
            <div
              className={`aspect-w-1 aspect-h-1 rounded-full overflow-hidden z-10 shadow-2xl group cursor-pointer`}
            >
              <Image
                className={`w-full h-full object-cover transition-transform z-0 nc-animation-spin rounded-full`}
                fill
                src={
                  getStrapiImage(
                    data?.thumbnailImage?.data?.attributes,
                    ScaleLevel.EXTRA_SMALL
                  ) || ''
                }
                alt="audio"
              />

              {/* <div className="bg-neutral-900 bg-blend-multiply bg-opacity-75 rounded-full"></div> */}
            </div>{' '}
          </div>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <span className="text-neutral-500 dark:text-neutral-400">
                Ngày đăng:
                <span className="mx-1"></span>
                {moment(data?.createdDate || new Date()).format('DD MM, YYYY')}
              </span>
            </div>
            <SingleTitle title={data?.name} />
            <span className="hidden lg:block text-lg text-neutral-500 dark:text-neutral-400">
              {data?.description}
            </span>
          </div>
        </div>
        <div className="  md:mt-10 mt-10 mb-10 flex justify-center">
          <div
            className="ck-content text-lg"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
        </div>
      </header>
    </div>
  );
}

export default Content;
