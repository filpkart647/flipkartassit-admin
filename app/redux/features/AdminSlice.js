import { getReq } from '@/utils/apiHandlers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAdminData = createAsyncThunk('adminData', async () => {
  const res = await getReq('/admin');
  return res;
});

export const AdminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminDetails: {},
    isLoading: false,
    isError: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAdminData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAdminData.fulfilled, (state, action) => {
      state.adminDetails = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getAdminData.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    });
  },
});

export default AdminSlice.reducer;
