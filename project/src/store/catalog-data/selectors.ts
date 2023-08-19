import {NameSpace} from '../../const';
import {State, TProduct, TPromo} from '../../types/types';

export const getProducts = (state: State): TProduct[] => state[NameSpace.Catalog].products;
export const getProductsWithRating = (state: State): TProduct[] => state[NameSpace.Catalog].productsWithRating;
export const getCurrentProductList = (state: State): TProduct[] => state[NameSpace.Catalog].currentProductList;
export const getCurrentPriceRangeProductsIdList = (state: State): number[] => state[NameSpace.Catalog].currentPriceRangeProductsIdList;
export const getPromo = (state: State): TPromo|null => state[NameSpace.Catalog].promo;
export const getCatalogDataLoadingStatus = (state: State): boolean => state[NameSpace.Catalog].isCatalogDataLoaded;
export const getProductsError = (state: State): boolean => state[NameSpace.Catalog].productsError;

