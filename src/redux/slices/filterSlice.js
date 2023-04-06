import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярністю', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log('setCategoryId from filterSlice', action.payload);
      state.categoryId = action.payload;
    },
    setSortOption(state, action) {
      console.log('setSortOption from filterSlice', action.payload);
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSortOption, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
