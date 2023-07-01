import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State, TBasketData, TProduct} from '../../types/types';
import {NameSpace} from '../../const';
import {getProducts} from '../catalog-data/selectors';
import {rootReducer} from '../root-reducer';


const initialState: TBasketData = {
  basketList:[],
  candidateForBasketList: null,
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
    setCandidateForBasket: (state, action: PayloadAction<{id: number}>) => {
      const {id} = action.payload;
      const products: TProduct[] = getProducts(/*сюда бы положить глобальный стор, да?*/);
      const element:TProduct | undefined = products.find((product) =>
        product.id === id
      );
      if(element){
        state.candidateForBasketList = element;
      }
    },

  },
});

export const {addItemToBasket, setCandidateForBasket} = basketData.actions;
