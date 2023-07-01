import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {catalogData} from './catalog-data/catalog-data';
import {productData} from './product-data/product-data';
import {basketData} from './basket-data/basket-data';


export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogData.reducer,
  [NameSpace.Product]: productData.reducer,
  [NameSpace.Basket]: basketData.reducer,
});
