import {NameSpace} from '../../const';
import {State, TProduct, TReview} from '../../types/types';

export const getProduct = (state: State): TProduct|null => state[NameSpace.Product].product;
export const getSimilarProducts = (state: State): TProduct[] => state[NameSpace.Product].similarProducts;
export const getReviews = (state: State): TReview[] => state[NameSpace.Product].reviews;
export const getProductDataLoadingStatus = (state: State): boolean => state[NameSpace.Product].isProductDataLoaded;
