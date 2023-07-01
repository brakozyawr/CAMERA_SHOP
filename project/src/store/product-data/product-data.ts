import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TProductData} from '../../types/types';
import {fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../api-actions';


const initialState: TProductData = {
  product: null,
  similarProducts: [],
  reviews: [],
  isDataLoaded: false,
};

export const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isDataLoaded = false;
      });

  }
});
