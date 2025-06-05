import { getReq } from '@/utils/apiHandlers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllOffers = createAsyncThunk('get-all-offers', async () => {
  const res = await getReq('/games/offers');
  return res;
});

export const OfferSlice = createSlice({
  name: 'offers',
  initialState: {
    allOffers: [],
    isLoading: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOffers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOffers.fulfilled, (state, action) => {
      state.isLoading = true;
      state.allOffers = action.payload;
    });
    builder.addCase(getAllOffers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default OfferSlice.reducer;
