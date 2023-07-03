import {NameSpace} from '../../const';
import {State} from '../../types/types';

export const getBasketList = (state: State): number[] => state[NameSpace.Basket].basketList;
export const getCandidateForBasketList = (state: State): number => state[NameSpace.Basket].candidateForBasketList;
