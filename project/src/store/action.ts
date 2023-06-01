import {createAction} from '@reduxjs/toolkit';
import {TProduct, TPromo, TReview} from '../types/types';

export const loadProducts = createAction<TProduct[]>('data/loadProducts');
export const loadProduct = createAction<TProduct | undefined>('data/loadProduct');
export const loadSimilarProducts = createAction<TProduct[]>('data/loadSimilarProducts');
export const loadReviews = createAction<TReview[]>('data/loadReviews');
export const loadPromo = createAction<TPromo>('data/loadPromo');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const setError = createAction<string | null>('data/setError');
