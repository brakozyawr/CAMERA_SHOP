import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TProductData} from '../../types/types';
import {fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../api-actions';


const initialState: TProductData = {
  product: null,
  similarProducts: [],
  reviews: [],
  isProductDataLoaded: false,
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
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductAction.pending, (state) => {
        state.isProductDataLoaded = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductDataLoaded = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        //state.isProductDataLoaded = false;
      });

  }
});

export const {resetProductData} = productData.actions;
