import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TCatalogData} from '../../types/types';
import {fetchProductsAction, fetchPromoAction} from '../api-actions';

const initialState: TCatalogData = {
  products: [],
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
      });
  }

});
