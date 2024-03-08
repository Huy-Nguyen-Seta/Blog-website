'use client';

import { fetchStorageByIdUser } from '@/app/GlobalRedux/action';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import useTrans from '@/hooks/useTranslate';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStrapiURL } from '../utils/api-helpers';
import { showErrorMessage, showSuccessMessage } from '../utils/toastify';
import { useRouter } from 'next/navigation';
import { translateLanguage } from '@/utils/translateLanguage';

export interface NcBookmarkProps {
  containerClassName?: string;
  bookmarked?: boolean;
  postId?: string | number;
}

const NcBookmark: FC<NcBookmarkProps> = ({
  containerClassName = 'h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700',
  bookmarked = false,
  postId,
}) => {
  const storage = useSelector((state: RootState) => state.storage.storage);
  const router = useRouter();
  const lang = useTrans();
  const dispatch = useDispatch<AppDispatch>();
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const handleFetchStorage = (userId: string, lang: Language) => {
    dispatch(fetchStorageByIdUser({ userId: userId, lang: lang }));
  };

  useEffect(() => {
    if (postId && localStorage.getItem('userInfor')) {
      setIsBookmarked(storage?.includes(postId) || false);
    }
  }, [storage, postId]);

  const handleBookMarked = async () => {
    let user;
    if (localStorage.getItem('userInfor')) {
      user = JSON.parse(localStorage.getItem('userInfor') || '');
    } else {
      router.push('/news/login');
      showErrorMessage(translateLanguage('require_login', lang), {
        autoClose: 4000,
      });
      return;
    }
    if (postId) {
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

        const data = await axios.post(
          `${getStrapiURL('/api/storageBlogs')}`,
          { userId: user?._id, blogs: postId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data?.data?.isAdd) {
          showSuccessMessage(translateLanguage('save_success', lang), { autoClose: 4000 });
        } else if (data?.data?.isDelete) {
          showSuccessMessage(translateLanguage('unsave_success', lang), {
            autoClose: 4000,
          });
        }
        handleFetchStorage(user?._id, lang);
      } catch (err) {
        console.log('err', err);
        showErrorMessage(translateLanguage('try_again', lang), {
          autoClose: 4000,
        });
      }
      setIsBookmarked(!isBookmarked);
    }
  };
  return (
    <button
      className={`nc-NcBookmark relative rounded-full flex items-center justify-center ${containerClassName}`}
      title={translateLanguage('save_to_favorites', lang)}
      onClick={handleBookMarked}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        fill={isBookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        className="w-[18px] h-[18px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </button>
  );
};

export default NcBookmark;
