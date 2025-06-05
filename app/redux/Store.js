import { configureStore } from '@reduxjs/toolkit';
import Admin from './features/AdminSlice';
import offers from './features/OfferSlice';

export const store = configureStore({
  reducer: {
    Admin,
    offers,
  },
});
