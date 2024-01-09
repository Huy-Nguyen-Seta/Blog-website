import { getStrapiImage } from '@/components/utils/api-helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Product({ products }: { products: any }) {
  if (products?.length === 1) {
    const item = products[0];
    return (
      <Link
        target="_blank"
        href={item?.link || '/'}
        className="flex flex-row items-start p-3 rounded-xl border border-solid border-[#eaeaea] bg-white space-x-4 group/item pb-4 !no-underline"
      >
        <div className="relative h-[130px] mb-[20px] aspect-[1/1]">
          <Image
            alt={item?.image?.data?.attributes?.name}
            fill
            src={getStrapiImage(item?.image?.data?.attributes) || ''}
            sizes="(max-width: 600px) 480px, 500px"
            className=" w-full h-full object-cover !my-0 "
          />
        </div>
        <div className="space-y-2">
          <div className="font-bold  line-clamp-2 group-hover/item:text-green-800">
            {item?.productName}
          </div>
          <div className="flex flex-row space-x-4">
            <div className="text-xl text-orange-500 font-bold">
              {(item?.price - item?.price * (item?.discount || 1))
                ?.toFixed(3)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              ₫
            </div>
            <div className="space-x-2 flex flex-row items-center">
              <div className="text-gray-400 line-through text-sm">
                {item?.price?.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,')}₫
              </div>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white rounded text-sm w-fit font-semibold">
            Xem thêm
          </button>
        </div>
      </Link>
    );
  }
  return (
    <div>
      <h2 className="text-lg font-semibold">Các dòng sản phẩm bán chạy</h2>
      <div className="md:grid grid-cols-3 gap-8 flex flex-col pt-1">
        {products?.map((item: any) => (
          <Link
            href={item?.link || '/'}
            key={item?.id}
            target="_blank"
            className="!no-underline flex flex-col justify-center items-center"
          >
            <div className="aspect-[3/2] w-full relative">
              <Image
                alt={item?.image?.data?.attributes?.name}
                fill
                src={getStrapiImage(item?.image?.data?.attributes) || ''}
                sizes="(max-width: 600px) 480px, 800px"
                className=" w-full h-full rounded-2xl shadow-md object-cover !my-0"
              />
            </div>
            <div className="flex flex-col justify-center items-center space-y-1 pt-1">
              <div className="font-semibold line-clamp-2">
                {item?.productName}
              </div>
              <div className="font-bold text-xl text-red-600">
                {(item?.price - item?.price * (item?.discount || 1))
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
            <button className="bg-orange-500 hover:bg-orange-600 px-2 py-1 text-white rounded text-sm w-fit">
              Xem thêm
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;
