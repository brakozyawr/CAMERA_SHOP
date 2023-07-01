import {NameSpace} from '../../const';
import {State, TProduct, TPromo} from '../../types/types';

export const getProducts = (state: State): TProduct[] => state[NameSpace.Catalog].products;
export const getPromo = (state: State): TPromo|null => state[NameSpace.Catalog].promo;
export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Catalog].isDataLoaded;
