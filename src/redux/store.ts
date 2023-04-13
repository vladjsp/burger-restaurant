import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './slices/filter/filterSlice';
import cartSlice from './slices/cart/cartSlice';
import burgersSlice from './slices/burger/burgersSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    burgers: burgersSlice,
  },
});

type FuncType = typeof store.getState;

export type RootState = ReturnType<FuncType>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
