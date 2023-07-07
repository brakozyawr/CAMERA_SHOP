import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import {makeFakeProducts} from '../../utils/mocks';
import ProductDescription from './product-description';

import HistoryRouter from '../history-route/history-route';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';


const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const product = makeFakeProducts()[0];
const setAddItemPopupState = jest.fn();


describe('Component: ProductDescription', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog);
    const store = mockStore({});

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductDescription
              product={product}
              setAddItemPopupState={setAddItemPopupState}
            />
          </HelmetProvider>
        </HistoryRouter >
      </Provider>);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(`${product.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(product.type)).toBeInTheDocument();
    expect(screen.getByText(product.level)).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
    expect(screen.getByTestId('add-to-card-button').textContent).toBe('Добавить в корзину');
    expect(screen.getByTestId('characteristic').textContent).toBe('Характеристики');
    expect(screen.getByTestId('description').textContent).toBe('Описание');

  });


  it('should  if the button is clicked', async () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductDescription
              product={product}
              setAddItemPopupState={setAddItemPopupState}
            />
          </HelmetProvider>
        </HistoryRouter >
      </Provider>
    );

    await userEvent.click(screen.getByTestId('add-to-card-button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('BASKET/setCandidateForBasket');
    expect(setAddItemPopupState).toBeCalledTimes(1);

    await userEvent.click(screen.getByTestId('characteristic'));
    await userEvent.click(screen.getByTestId('description'));
  });

});
