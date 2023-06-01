import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State, TProduct} from '../types/types';
import {loadProducts, setDataLoadedStatus, setError} from './action';
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
