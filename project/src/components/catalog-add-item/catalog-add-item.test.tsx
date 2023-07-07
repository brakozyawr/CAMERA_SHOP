import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import CatalogAddItem from './catalog-add-item';
import {NameSpace} from '../../const';
import {makeFakeProducts} from '../../utils/mocks';


const mockStore = configureMockStore();
const products = makeFakeProducts();
const store = mockStore({
  [NameSpace.Catalog]: {products: products},
  [NameSpace.Basket]: {basketList: [], candidateForBasketList: products[2].id},
});


const setAddItemPopupState = jest.fn();

describe('Component: CatalogAddItem', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HelmetProvider>
          <CatalogAddItem setAddItemPopupState={setAddItemPopupState}/>
        </HelmetProvider>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();

  });
});
