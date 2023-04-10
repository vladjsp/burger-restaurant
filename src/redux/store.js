import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import burgersSlice from './slices/burgersSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    burgers: burgersSlice,
  },
});
