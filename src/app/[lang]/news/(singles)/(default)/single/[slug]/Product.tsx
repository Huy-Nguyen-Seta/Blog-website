import { getStrapiImage } from '@/components/utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Product({ products }: { products: any }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Các dòng sản phẩm bán chạy</h2>
      <div className="md:grid grid-cols-3 gap-8 flex flex-col pt-1">
        {products?.map((item: any) => (
          <Link href={item?.link || '/'}  key={item?.id} className='!no-underline'>
            <div className="aspect-[3/2] w-full relative">
              <Image
                alt={item?.image?.data?.attributes?.name}
                fill
                src={getStrapiImage(item?.image?.data?.attributes) || ''}
                sizes="(max-width: 600px) 480px, 800px"
                className=" w-full h-full rounded-2xl shadow-md object-contain !my-0"
              />
            </div>
            <div className="flex flex-col justify-center items-center space-y-1 pt-1">
              <div className="font-semibold">{item?.productName}</div>
              <div className="font-bold text-xl text-red-600">
                {(item?.price * (item?.discount || 1))
                  ?.toFixed(3)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </div>
              <div className="space-x-2 flex flex-row items-center">
                <div className="text-gray-400 font-medium line-through">
                  {item?.price?.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </div>
                <span className="text-red-600 rounded-2xl bg-red-200  px-2 py-1 text-xs font-semibold h-fit ">
                  {'-'}
                  {item?.discount * 100}
                  {'%'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;
