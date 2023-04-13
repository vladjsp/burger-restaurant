import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { TBurger, Status, IBurgerSliceState } from './types';

export const fetchBurgers = createAsyncThunk<TBurger[], Record<string, string>>(
  'burgers/fetchBurgersList',
  async (params) => {
    const { currentPage, limitPerPage, category, sortBy, sortOrder } = params;
    const { data } = await axios.get<TBurger[]>(
      `https://642be6fad7081590f92ca383.mockapi.io/items?page=${currentPage}&limit=${limitPerPage}&${category}&sortBy=${sortBy}&order=${sortOrder}`
    );
    return data;
  }
);

const initialState: IBurgerSliceState = {
  burgersList: [],
  requestStatus: Status.LOADING, //loading | success | error
};

const burgersSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setBurgers(state, action: PayloadAction<TBurger[]>) {
      state.burgersList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBurgers.pending, (state, action) => {
      state.requestStatus = Status.LOADING;
      state.burgersList = [];
    });
    builder.addCase(fetchBurgers.fulfilled, (state, action) => {
      state.burgersList = action.payload;
      state.requestStatus = Status.SUCCESS;
    });
    builder.addCase(fetchBurgers.rejected, (state, action) => {
      state.requestStatus = Status.ERROR;
      state.burgersList = [];
    });
  },
});

export const selectBurgerData = (state: RootState) => state.burgers;

export const { setBurgers } = burgersSlice.actions;

export default burgersSlice.reducer;
