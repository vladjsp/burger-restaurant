import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBurgers = createAsyncThunk('burgers/fetchBurgersList', async (params) => {
  const { currentPage, limitPerPage, category, sortBy, sortOrder } = params;
  const { data } = await axios.get(
    `https://642be6fad7081590f92ca383.mockapi.io/items?page=${currentPage}&limit=${limitPerPage}&${category}&sortBy=${sortBy}&order=${sortOrder}`
  );
  return data;
});

const initialState = {
  burgersList: [],
  requestStatus: 'loading', //loading | success | error
};

const burgersSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setBurgers(state, action) {
      state.burgersList = action.payload;
    },
  },
  extraReducers: {
    [fetchBurgers.pending]: (state) => {
      state.requestStatus = 'loading';
      state.burgersList = [];
    },
    [fetchBurgers.fulfilled]: (state, action) => {
      state.burgersList = action.payload;
      state.requestStatus = 'success';
    },
    [fetchBurgers.rejected]: (state) => {
      state.requestStatus = 'error';
      state.burgersList = [];
    },
  },
});

export const { setBurgers } = burgersSlice.actions;

export default burgersSlice.reducer;
