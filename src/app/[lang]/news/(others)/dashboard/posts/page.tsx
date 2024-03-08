'use client';
import React, { useEffect, useState } from 'react';
import NcImage from '@/components/NcImage/NcImage';
import Pagination from '@/components/Pagination/Pagination';
import { getData } from '@/components/utils/fetch-api';
import useTrans from '@/hooks/useTranslate';
import { getStrapiImage, getStrapiURL } from '@/components/utils/api-helpers';
import moment from 'moment';
import Link from 'next/link';
import axios from 'axios';
import { showSuccessMessage } from '@/utils/toastify';
import { TrashIcon } from '@heroicons/react/24/solid';
import { translateLanguage } from '@/utils/translateLanguage';

const people = [
  {
    id: 1,
    title: 'Tokyo Fashion Week Is Making Itself Great Again',
    image:
      'https://images.unsplash.com/photo-1617059063772-34532796cdb5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60',
    liveStatus: true,
    payment: 'Not Applicable',
  },
  {
    id: 2,
    title: 'Traveling Tends to Magnify All Human Emotions',
    image:
      'https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60',
    liveStatus: true,
    payment: 'Not Applicable',
  },
  {
    id: 3,
    title: 'Interior Design: Hexagon is the New Circle in 2018',
    image:
      'https://images.unsplash.com/photo-1617201277988-f0efcc14e626?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60',
    liveStatus: true,
    payment: 'Not Applicable',
  },
  {
    id: 4,
    title: 'Heritage Museums & Gardens to Open with New Landscape',
    image:
      'https://images.unsplash.com/photo-1622960748096-1983e5f17824?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60',
    liveStatus: true,
    payment: 'Not Applicable',
  },
  {
    id: 5,
    title:
      'Man agrees to complete $5,000 Hereford Inlet Lighthouse painting job',
    image:
      'https://images.unsplash.com/photo-1617202227468-7597afc7046d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60',
    liveStatus: false,
    payment: 'Not Applicable',
  },
  {
    id: 6,
    title:
      'Denton Corker Marshall the mysterious black box is biennale pavilion',
    image:
      'https://images.unsplash.com/photo-1622978147823-33d5e241e976?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60',
    liveStatus: true,
    payment: 'Not Applicable',
  },
];
const numberPerPage = 8;

const DashboardPosts = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const lang = useTrans();

  const handleChangePage = (page: number) => {
    setPage(page);
    handleFetchData(page * numberPerPage, numberPerPage);
  };

  const handleDelete = async (id: number) => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    let user;
    if (localStorage.getItem('userInfor')) {
      user = JSON.parse(localStorage.getItem('userInfor') || '');
    }
    if (user) {
      const data = await axios.post(
        `${getStrapiURL('/api/storageBlogs')}`,
        { userId: user?._id, blogs: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data?.data?.isDelete) {
        showSuccessMessage(translateLanguage('save_success', lang), {
          autoClose: 4000,
        });
      }
      handleFetchData(0, numberPerPage);
      setPage(0);
    }
  };

  const handleFetchData = async (start: number, limit: number) => {
    let user;
    if (localStorage.getItem('userInfor'))
      user = JSON.parse(localStorage.getItem('userInfor') || '');

    if (user) {
      const response = await getData(lang, '/getStorageByUser', {
        userId: user?._id,
        withPopulate: true,
        start: start,
        limit: limit,
      });
      setData(response?.blogs);
      setTotal(response?.total);
    }
  };

  useEffect(() => {
    handleFetchData(page, numberPerPage);
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    {translateLanguage('post', lang)}
                  </th>
                  <th scope="col" className="px-6 py-3">
                  {translateLanguage('author',lang)}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày đăng
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    Thao tác
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {data?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                          src={getStrapiImage(item.thumbnailImage) || ''}
                          fill
                          sizes="80px"
                          alt="post"
                        />
                        <div className="ms-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300 hover:underline">
                            <Link href={`/${lang}/news/${item?.slug}`}>
                              {' '}
                              {item.title}
                            </Link>
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.author?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <span>
                        {' '}
                        {moment(item?.createdAt).format('MMM DD, YYYY')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-neutral-300">
                      <span
                        onClick={() => handleDelete(item?.id)}
                        className="text-rose-600 hover:text-rose-900 px-6 flex flex-row items-center justify-center"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination
        total={total}
        activePage={page}
        handlePage={handleChangePage}
      />
    </div>
  );
};

export default DashboardPosts;
