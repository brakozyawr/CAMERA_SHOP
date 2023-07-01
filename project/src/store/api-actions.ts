import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State, TProduct, TPromo, TReview, TReviewAdd} from '../types/types';
import {APIRoute} from '../const';


export const fetchProductsAction = createAsyncThunk<TProduct[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<TProduct[]>(APIRoute.Products);
    return data;
  },
);


export const fetchProductAction = createAsyncThunk<TProduct, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProduct',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<TProduct>(`${APIRoute.Product}${id}`);
    return data;
  },
);

export const fetchSimilarProductsAction = createAsyncThunk<TProduct[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarProducts',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<TProduct[]>(`${APIRoute.Product}${id}${APIRoute.Similar}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<TReview[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<TReview[]>(`${APIRoute.Product}${id}${APIRoute.Reviews}`);
    return data;
  },
);

export const addReviewAction = createAsyncThunk<TReview[], TReviewAdd, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/addReview',
  async ({cameraId,userName, advantage,disadvantage,review, rating}, {dispatch, extra: api}) => {
    await api.post<TReviewAdd>(`${APIRoute.Reviews}`, {cameraId,userName, advantage,disadvantage,review, rating});
    const {data} = await api.get<TReview[]>(`${APIRoute.Product}${cameraId}${APIRoute.Reviews}`);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<TPromo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<TPromo>(APIRoute.Promo);
    return data;
  },
);
