import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  loading: false,
  error: false,
};

export const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
    getgetAllProductRequestLoading: (state) => {
      state.loading = true;
    },
    getAllProductRequestSuccess: (state, action) => {
      state.allProducts = action.payload;
      state.loading = false;
      console.log(action.payload);
    },
    getAllProductsRequestFail: (state, action) => {
      state.error = true;
    },
  },
});

export const {
  getgetAllProductRequestLoading,
  getAllProductRequestSuccess,
  getAllProductsRequestFail,
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
