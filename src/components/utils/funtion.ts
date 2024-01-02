import axios from 'axios';
import { getStrapiURL } from './api-helpers';
import { showSuccessMessage } from './toastify';

export const likedBlog = async (blogId: number | string) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const response = await axios.post(
      `${getStrapiURL('/api/likedBlog')}`,
      { blogId: blogId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response?.status === 200) {
      showSuccessMessage('Đã thích', {
        autoClose: 4000,
      });
    }
  } catch {
    showSuccessMessage('Vui lòng thử lại sau', {
      autoClose: 4000,
    });
  }
};

export const likedComment = async (commentId: number | string) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const response = await axios.post(
      `${getStrapiURL('/api/likeComment')}`,
      { commentId: commentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response?.status === 200) {
      showSuccessMessage('Đã thích bình luận', {
        autoClose: 4000,
      });
    }
  } catch {
    showSuccessMessage('Vui lòng thử lại sau', {
      autoClose: 4000,
    });
  }
};
