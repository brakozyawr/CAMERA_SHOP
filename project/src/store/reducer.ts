import {createReducer} from '@reduxjs/toolkit';
import {
  loadProducts,
  loadProduct,
  loadPromo,
  loadReviews,
  loadSimilarProducts,
  setDataLoadedStatus,
  setError,
  setReviewsDataLoadingStatus, addItemToBasket, setCandidateForBasket
} from './action';
import {TProduct, TPromo, TReview} from '../types/types';

type TinitialState = {
  products: TProduct[];
  product: TProduct | null;
  similarProducts: TProduct[];
  reviews: TReview[];
  promo: TPromo | null;
  basketList: TProduct[];
  candidateForBasketList: TProduct | null;
  error: string | null;
  isDataLoaded: boolean;
  isReviewsDataLoading: boolean;
};

const initialState:TinitialState = {
  products: [],
  product: null,
  similarProducts: [],
  reviews: [],
  promo: null,
  basketList:[],
  candidateForBasketList: null,
  error: null,
  isDataLoaded: false,
  isReviewsDataLoading: false,
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
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(setCandidateForBasket, (state, action) => {
      const element = state.products.find((product) =>
        product.id === action.payload
      );
      if(element){
        state.candidateForBasketList = element;
      }
    })
    .addCase(addItemToBasket, (state) => {
      const newElement = state.candidateForBasketList;
      if(newElement){
        state.basketList.push(newElement);
      }
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });


});

export {reducer};
