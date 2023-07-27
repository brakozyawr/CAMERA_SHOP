import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TCatalogData, TProduct} from '../../types/types';
import {fetchProductsAction, fetchPromoAction, fetchAllProductsReviewsAction} from '../api-actions';
import { enableMapSet } from 'immer';
import {sortProducts} from '../../util';
import {getProducts} from './selectors';


enableMapSet();

const initialState: TCatalogData = {
  products: [],
  allProductsRatingList: new Map<number, number>(),
  promo: null,
  isCatalogDataLoaded: false,
  productsError: false,
};

export const catalogData = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    sortingProducts: (state, action) =>{
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const [currentSorting, property]:[string, keyof TProduct] = action.payload;
      state.products = sortProducts(state.products, currentSorting , property );
      //console.log(currentSorting);
      //console.log(property);
      console.log(state.products);
    }
  },
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
      })
      .addCase(fetchAllProductsReviewsAction.fulfilled, (state, action) => {
        const [id, reviews] = action.payload;
        const summary = reviews.reduce((sum, current) => sum + current.rating, 0);
        const rating = Math.ceil(summary / reviews.length);
        state.allProductsRatingList.set(id, rating);
      });
  }

});

export const {sortingProducts} = catalogData.actions;
