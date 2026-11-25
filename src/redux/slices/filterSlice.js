import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  minPrice: '',
  maxPrice: '',
  selectedRating: 0,
  sortBy: 'recommended', // 'recommended' | 'price-low' | 'price-high' | 'rating'
  currentPage: 1,
  itemsPerPage: 5,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to page 1 on search change
    },
    setPriceRange(state, action) {
      const { min, max } = action.payload;
      state.minPrice = min;
      state.maxPrice = max;
      state.currentPage = 1;
    },
    setSelectedRating(state, action) {
      state.selectedRating = action.payload;
      state.currentPage = 1;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    resetFilters(state) {
      state.searchTerm = '';
      state.minPrice = '';
      state.maxPrice = '';
      state.selectedRating = 0;
      state.sortBy = 'recommended';
      state.currentPage = 1;
    },
  },
});

export const {
  setSearchTerm,
  setPriceRange,
  setSelectedRating,
  setSortBy,
  setCurrentPage,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

