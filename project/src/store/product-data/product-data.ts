import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TProductData} from '../../types/types';
import {addReviewAction, fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../api-actions';


const initialState: TProductData = {
  product: null,
  similarProducts: [],
  reviews: [],
  isProductDataLoaded: false,
  productError: false,
};

export const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    resetProductData: (state) => {
      state.product = null;
      state.similarProducts = [];
      state.reviews = [];
      state.isProductDataLoaded = false;
      state.productError = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductAction.pending, (state) => {
        state.isProductDataLoaded = true;
        state.productError = false;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductDataLoaded = false;
        state.productError = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.productError = true;
        state.isProductDataLoaded = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export const {resetProductData} = productData.actions;
