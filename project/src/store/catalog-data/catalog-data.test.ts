import {catalogData} from './catalog-data';
import {makeFakeProducts, makeFakePromo} from '../../utils/mocks';
import {fetchProductsAction, fetchPromoAction} from '../api-actions';

const products = makeFakeProducts();
const promo = makeFakePromo();

describe('Reducer: catalogData', () => {
  it('without additional parameters should return initial state', () => {
    expect(catalogData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({products: [], allProductsRatingList: new Map(), promo: null, isCatalogDataLoaded: false, productsError: false,});
  });

  it('should update products by load products', () => {
    const state = {products: [], allProductsRatingList: new Map(), promo: null, isCatalogDataLoaded: false, productsError: false,};
    expect(catalogData.reducer(state, {type: fetchProductsAction.fulfilled.type, payload: products}))
      .toEqual({products, allProductsRatingList: new Map(), promo: null, isCatalogDataLoaded: false, productsError: false});
  });

  it('should update products by error', () => {
    const state = {products: [], allProductsRatingList: new Map(), promo: null, isCatalogDataLoaded: false, productsError: false,};
    expect(catalogData.reducer(state, {type: fetchProductsAction.rejected.type}))
      .toEqual({products: [], allProductsRatingList: new Map(), promo: null, isCatalogDataLoaded: false, productsError: true});
  });

  it('should update promo by load promo', () => {
    const state = {products: [],allProductsRatingList: new Map(), promo: null, isCatalogDataLoaded: false, productsError: false,};
    expect(catalogData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: promo}))
      .toEqual({products: [], allProductsRatingList: new Map(), promo, isCatalogDataLoaded: false, productsError: false});
  });

});
