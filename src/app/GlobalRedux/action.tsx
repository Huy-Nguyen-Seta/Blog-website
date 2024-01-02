import { getData } from '@/components/utils/fetch-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStorageByIdUser = createAsyncThunk(
  'storage/fetchByIdUser',
  async (params: { userId: string; lang: Language }) => {
    const response = await getData(params?.lang, '/getStorageByUser', {
      userId: params?.userId,
    });
    return response.blogs.map((item: any) => item.id);
  }
);
