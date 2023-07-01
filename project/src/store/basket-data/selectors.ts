import {NameSpace} from '../../const';
import {State, TProduct} from '../../types/types';

export const getBasketList = (state: State): TProduct[] => state[NameSpace.Basket].basketList;
export const getCandidateForBasketList = (state: State): TProduct|null => state[NameSpace.Basket].candidateForBasketList;
