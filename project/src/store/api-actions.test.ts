import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute} from '../const';
import {State} from '../types/types';
import {
  makeFakeProduct,
  makeFakeProducts,
  makeFakePromo,
  makeFakeReview,
  makeFakeReviewAdd,
  makeFakeReviews
} from '../utils/mocks';
import {
  addReviewAction,
  fetchProductAction,
  fetchProductsAction,
  fetchPromoAction,
  fetchReviewsAction,
  fetchSimilarProductsAction
} from './api-actions';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should dispatch Load_Products when GET /cameras', async () => {
    const mockProducts = makeFakeProducts();
    mockAPI
      .onGet(APIRoute.Products)
      .reply(200, mockProducts);

    const store = mockStore();

    await store.dispatch(fetchProductsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Promo when GET /promo', async () => {
    const mockPromo = makeFakePromo();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Product when GET /cameras/', async () => {
    const mockProduct = makeFakeProduct();

    mockAPI
      .onGet(`${APIRoute.Product}${mockProduct.id}`)
      .reply(200, mockProduct);

    const store = mockStore();

    await store.dispatch(fetchProductAction(mockProduct.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchProductAction.pending.type,
      fetchProductAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Similar_Products when GET /similar', async () => {
    const mockProduct = makeFakeProduct();
    const mockSimilarProducts = makeFakeProducts();

    mockAPI
      .onGet(`${APIRoute.Product}${mockProduct.id}${APIRoute.Similar}`)
      .reply(200, mockSimilarProducts);

    const store = mockStore();

    await store.dispatch(fetchSimilarProductsAction(mockProduct.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarProductsAction.pending.type,
      fetchSimilarProductsAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Reviews when GET /reviews', async () => {
    const mockProduct = makeFakeProduct();
    const mockReviews = makeFakeReviews();

    mockAPI
      .onGet(`${APIRoute.Product}${mockProduct.id}${APIRoute.Reviews}`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(mockProduct.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });


  it('should dispatch Add_Review  when POST /reviews', async () => {
    const mockReviewAdd = makeFakeReviewAdd();
    const mockReview = makeFakeReview();
    const mockReviews = makeFakeReviews();

    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, mockReview)
      .onGet(`${APIRoute.Product}${mockReviewAdd.cameraId}${APIRoute.Reviews}`)
      .reply(200, mockReviews);


    const store = mockStore();

    await store.dispatch(addReviewAction(mockReviewAdd));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type
    ]);

  });

});
