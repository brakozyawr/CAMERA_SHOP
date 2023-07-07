import {addItemToBasket, basketData, setCandidateForBasket} from './basket-data';
import {makeFakeProduct} from '../../utils/mocks';


const candidateForBasketList = makeFakeProduct().id;

describe('Reducer: gameData', () => {
  it('without additional parameters should return initial state', () => {
    expect(basketData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({basketList: [], candidateForBasketList: 0});
  });

  it('should update candidateForBasketList by load candidateForBasketList', () => {
    const state = {basketList: [], candidateForBasketList: 0};
    expect(basketData.reducer(state, setCandidateForBasket(candidateForBasketList)))
      .toEqual({basketList: [], candidateForBasketList});
  });

  it('should update basketList', () => {
    const state = {basketList: [], candidateForBasketList};
    expect(basketData.reducer(state, addItemToBasket()))
      .toEqual({basketList: [candidateForBasketList], candidateForBasketList: 0});
  });

});
