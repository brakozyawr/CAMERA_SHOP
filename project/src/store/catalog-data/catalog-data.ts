import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TCatalogData} from '../../types/types';
import {fetchProductsAction, fetchPromoAction, fetchReviewsAction2} from '../api-actions';
import { enableMapSet } from 'immer';

enableMapSet();

const initialState: TCatalogData = {
  products: [],
  /*ratingList: new Map<number, number>(),*/
  promo: null,
  isCatalogDataLoaded: false,
  productsError: false,
};

export const catalogData = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isCatalogDataLoaded = true;
        state.productsError = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isCatalogDataLoaded = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.productsError = true;
        state.isCatalogDataLoaded = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isCatalogDataLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isCatalogDataLoaded = false;
      /*})
      .addCase(fetchReviewsAction2.fulfilled, (state, action) => {
        const [id, reviews] = action.payload;
        const summary = reviews.reduce((sum, current) => sum + current.rating, 0);
        const rating = Math.round(summary / reviews.length);
        state.ratingList.set(id, rating);*/
      });
  }

});
