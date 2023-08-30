import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, Property, Sorting} from '../../const';
import {TCatalogData, TProduct, TSelectedFilters} from '../../types/types';
import {
  fetchProductsAction,
  fetchPromoAction,
  fetchAllProductsReviewsAction,
  fetchRangeProductAction
} from '../api-actions';
import {getFilteredProducts, sortProducts} from '../../util';


const initialState: TCatalogData = {
  products: [],
  productsWithRating: [],
  productsWithRatingCount: 0,
  currentPriceRangeProductsIdList:[],
  currentProductList: [],
  currentFilters: {},
  currentSortingType: Sorting.Default,
  currentSortingProperty: Property.Default,
  promo: null,
  isCatalogDataLoaded: true,
  productsError: false,
  absolyteMinPrice: 0,
  absolyteMaxPrice: 0,
};

export const catalogData = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    sortingProducts: (state, action:PayloadAction<[string, keyof TProduct | Property.Default]>) => {
      const [currentSorting, property] = action.payload;
      state.currentSortingType = currentSorting;
      state.currentSortingProperty = property;

      const productList = state.currentProductList.length ? state.currentProductList : state.products;
      state.currentProductList = sortProducts(productList, currentSorting, property);
    },
    filterProducts: (state, action:PayloadAction<TSelectedFilters>) => {
      const propertyList = action.payload;
      let filteredProductsList: TProduct[];
      state.currentFilters = structuredClone(action.payload) as TSelectedFilters ;
      if(JSON.stringify(propertyList) === '{}'){
        filteredProductsList = state.productsWithRating.slice();
        state.currentFilters = {};
      }else {
        state.currentFilters = structuredClone(propertyList) as TSelectedFilters;
        filteredProductsList = getFilteredProducts(state.currentFilters, state.productsWithRating.slice());
      }
      state.currentProductList = sortProducts(filteredProductsList, state.currentSortingType, state.currentSortingProperty);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isCatalogDataLoaded = true;
        state.productsError = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsWithRating = action.payload;
        //state.isCatalogDataLoaded = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.productsError = true;
        state.isCatalogDataLoaded = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        //state.isCatalogDataLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        //state.isCatalogDataLoaded = false;
      })
      .addCase(fetchRangeProductAction.fulfilled, (state, action) => {
        state.currentPriceRangeProductsIdList = action.payload;
      })
      .addCase(fetchAllProductsReviewsAction.fulfilled, (state, action) => {
        const [id, reviews] = action.payload;
        const summary = reviews.reduce((sum, current) => sum + current.rating, 0);
        const rating = Math.ceil(summary / reviews.length);
        const product = state.productsWithRating.find((item) => item.id === id) as TProduct;
        if(product) {
          product.rating = rating;
          state.productsWithRatingCount++;
        }
        if(state.productsWithRatingCount === state.products.length){
          state.products = state.productsWithRating;
          state.currentProductList = state.productsWithRating;
          state.isCatalogDataLoaded = false;

          const sortedAllProductList = sortProducts(state.productsWithRating.slice(), Sorting.Up, Property.Price);
          state.absolyteMinPrice = sortedAllProductList[0].price;
          state.absolyteMaxPrice = sortedAllProductList[sortedAllProductList.length - 1].price;
        }
      });
  }

});

export const {sortingProducts, filterProducts} = catalogData.actions;
