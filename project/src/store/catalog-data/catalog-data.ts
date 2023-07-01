import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TCatalogData} from '../../types/types';
import {fetchProductsAction, fetchPromoAction} from '../api-actions';

const initialState: TCatalogData = {
  products: [],
  promo: null,
  isDataLoaded: false,
};

export const catalogData = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        //взять данные из списка продуктов
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isDataLoaded = false;
      });
  }

});
