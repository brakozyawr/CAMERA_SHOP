import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, Property, Sorting} from '../../const';
import {TCatalogData, TProduct} from '../../types/types';
import {fetchProductsAction, fetchPromoAction, fetchAllProductsReviewsAction} from '../api-actions';
import {sortProducts} from '../../util';


const initialState: TCatalogData = {
  products: [],
  currentProductList: [],
  currentSortingType: Sorting.Default,
  currentSortingProperty: Property.Default,
  promo: null,
  isCatalogDataLoaded: false,
  productsError: false,
};

export const catalogData = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    sortingProducts: (state, action:PayloadAction<[string, keyof TProduct | Property.Default]>) => {
      const [currentSorting, property] = action.payload;
      state.currentSortingType = currentSorting;
      state.currentSortingProperty = property;

      //state.products = sortProducts(state.products, currentSorting , property );
      const productList = state.currentProductList.length ? state.currentProductList : state.products;
      state.currentProductList = sortProducts(productList, currentSorting, property);
    },
    filteredProducts: (state, action:PayloadAction<TProduct[]>) => {
      const filteredProductsList = action.payload;
      state.currentProductList = sortProducts(filteredProductsList, state.currentSortingType, state.currentSortingProperty);
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
        const product = state.products.find((item) => item.id === id);
        if(product) {
          product.rating = rating;
        }
      });
  }

});

export const {sortingProducts, filteredProducts} = catalogData.actions;
