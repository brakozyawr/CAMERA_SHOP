import {productData, resetProductData} from './product-data';
import {makeFakeProduct, makeFakeProducts, makeFakeReviews} from '../../utils/mocks';
import {addReviewAction, fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../api-actions';

const product = makeFakeProduct();
const similarProducts = makeFakeProducts();
const reviews = makeFakeReviews();


describe('Reducer: gameData', () => {
  it('without additional parameters should return initial state', () => {
    expect(productData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({product: null, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: false});
  });

  it('should update product by load product', () => {
    const state = {product: null, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: false};
    expect(productData.reducer(state, {type: fetchProductAction.fulfilled.type, payload: product}))
      .toEqual({product, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: false});
  });

  it('should update product by error', () => {
    const state = {product: null, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: false};
    expect(productData.reducer(state, {type: fetchProductAction.rejected.type}))
      .toEqual({product: null, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: true});
  });

  it('should update similarProducts by load similarProducts', () => {
    const state = {product: null, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: false};
    expect(productData.reducer(state, {type: fetchSimilarProductsAction.fulfilled.type, payload: similarProducts}))
      .toEqual({product: null, similarProducts, reviews: [], isProductDataLoaded: false, productError: false});
  });

  it('should update reviews by load reviews', () => {
    const state = {product: null, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: false};
    expect(productData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews, productError: false}))
      .toEqual({product: null, similarProducts: [], reviews, isProductDataLoaded: false, productError: false});
  });

  it('should update reviews by add review', () => {
    const state = {product: null, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: false};
    expect(productData.reducer(state, {type: addReviewAction.fulfilled.type, payload: reviews, productError: false}))
      .toEqual({product: null, similarProducts: [], reviews, isProductDataLoaded: false, productError: false});
  });

  it('should return initial state', () => {
    const state = {product, similarProducts, reviews, isProductDataLoaded: false, productError: false};
    expect(productData.reducer(state, resetProductData()))
      .toEqual({product: null, similarProducts: [], reviews: [], isProductDataLoaded: false, productError: false});
  });

});
