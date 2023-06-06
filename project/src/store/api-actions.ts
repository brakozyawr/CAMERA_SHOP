import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State, TProduct, TPromo, TReview} from '../types/types';
import {
  loadProduct,
  loadProducts,
  loadPromo,
  loadReviews,
  loadSimilarProducts,
  setDataLoadedStatus,
  setError
} from './action';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {store} from './';


export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchProductsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<TProduct[]>(APIRoute.Products);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadProducts(data));
    dispatch(setDataLoadedStatus(false));
  },
);


export const fetchProductAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProduct',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<TProduct>(`${APIRoute.Product}${id}`);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadProduct(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchSimilarProductsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarProducts',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<TProduct[]>(`${APIRoute.Product}${id}${APIRoute.Similar}`);
    //dispatch(setDataLoadedStatus(true));
    dispatch(loadSimilarProducts(data));
    //dispatch(setDataLoadedStatus(false));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<TReview[]>(`${APIRoute.Product}${id}${APIRoute.Reviews}`);
    //dispatch(setDataLoadedStatus(true));
    dispatch(loadReviews(data));
    //dispatch(setDataLoadedStatus(false));
  },
);

export const fetchPromoAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  //state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<TPromo>(APIRoute.Promo);
    //dispatch(setDataLoadedStatus(true));
    dispatch(loadPromo(data));
    //dispatch(setDataLoadedStatus(false));
  },
);
