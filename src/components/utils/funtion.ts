import axios from 'axios';
import { getStrapiURL } from './api-helpers';
import { showSuccessMessage } from './toastify';
import { translateLanguage } from '@/utils/translateLanguage';

export const likedBlog = async (blogId: number | string, lang?: Language) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const response = await axios.post(
      `${getStrapiURL('/api/likedBlog')}`,
      { blogId: blogId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response?.status === 200) {
      showSuccessMessage(translateLanguage('liked', lang || 'en'), {
        autoClose: 4000,
      });
    }
  } catch {
    showSuccessMessage(translateLanguage('try_again', lang || 'en'), {
      autoClose: 4000,
    });
  }
};

export const likedComment = async (commentId: number | string, lang?: Language) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const response = await axios.post(
      `${getStrapiURL('/api/likeComment')}`,
      { commentId: commentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response?.status === 200) {
      showSuccessMessage(translateLanguage('liked', lang || 'en'), {
        autoClose: 4000,
      });
    }
  } catch {
    showSuccessMessage(translateLanguage('try_again', lang || 'en'), {
      autoClose: 4000,
    });
  }
};
