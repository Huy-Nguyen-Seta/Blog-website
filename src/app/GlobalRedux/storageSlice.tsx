import { createSlice } from '@reduxjs/toolkit';
import { fetchStorageByIdUser } from './action';

interface StorageState {
  storage: any[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  storage: [],
  loading: 'idle',
} as StorageState;

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStorageByIdUser.fulfilled, (state, action) => {
      state.storage = action.payload;
    });
  },
});
export default storageSlice.reducer;
