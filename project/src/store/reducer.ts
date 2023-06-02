import {createReducer} from '@reduxjs/toolkit';
import {loadProducts,loadProduct, loadPromo, loadReviews, loadSimilarProducts, setDataLoadedStatus, setError} from './action';
import {TProduct, TPromo, TReview} from '../types/types';

type TinitialState = {
  products: TProduct[];
  product: TProduct|null;
  similarProducts: TProduct[];
  reviews: TReview[];
  promo: TPromo|null;
  error: string | null;
  isDataLoaded: boolean;
};

const initialState:TinitialState = {
  products: [],
  product: null,
  similarProducts: [],
  reviews: [],
  promo: null,
  error: null,
  isDataLoaded: false,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(loadProduct, (state, action) => {
      state.product = action.payload;
    })
    .addCase(loadSimilarProducts, (state, action) => {
      state.similarProducts = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });


});

export {reducer};
