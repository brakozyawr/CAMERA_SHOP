import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TBasketData} from '../../types/types';
import {NameSpace} from '../../const';


const initialState: TBasketData = {
  basketList:[],
  candidateForBasketList: 0,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItemToBasket: (state) => {
      const newElement = state.candidateForBasketList;
      if(newElement){
        state.basketList.push(newElement);
      }
    },
    setCandidateForBasket: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.candidateForBasketList = id;
    },

  },
});

export const {addItemToBasket, setCandidateForBasket} = basketData.actions;
