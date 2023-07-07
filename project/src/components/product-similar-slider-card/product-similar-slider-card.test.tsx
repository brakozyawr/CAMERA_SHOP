import {fireEvent, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import {makeFakeProducts} from '../../utils/mocks';
import ProductSimilarSliderCard from './product-similar-slider-card';

import HistoryRouter from '../history-route/history-route';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';


const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const product = makeFakeProducts()[0];
const setAddItemPopupState = jest.fn();


describe('Component: ProductSimilarSliderCard', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Product);
    const store = mockStore({});

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductSimilarSliderCard
              key={product.id}
              similarProduct={product}
              setAddItemPopupState={setAddItemPopupState}
            />
          </HelmetProvider>
        </HistoryRouter >
      </Provider>);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(`${product.price} ₽`)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Купить');
    expect(screen.getByRole('link').textContent).toBe('Подробнее');

  });


  it('should change store if the button is clicked', async () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductSimilarSliderCard
              key={product.id}
              similarProduct={product}
              setAddItemPopupState={setAddItemPopupState}
            />
          </HelmetProvider>
        </HistoryRouter >
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('BASKET/setCandidateForBasket');
    expect(setAddItemPopupState).toBeCalledTimes(1);

  });

  it('should fetch data if the link is clicked, switching to another product-page',() => {
    const store = mockStore({});
    history.push(`${AppRoute.Product}${product.id}`);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductSimilarSliderCard
              key={product.id}
              similarProduct={product}
              setAddItemPopupState={setAddItemPopupState}
            />
            <Routes>
              <Route
                path={`${AppRoute.Product}${product.id}`}
                element={<h1>Product Screen</h1>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter >
      </Provider>
    );

    expect(screen.getByText('Product Screen')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('data/fetchProduct/pending');
    expect(actions[1].type).toBe('data/fetchSimilarProducts/pending');
    expect(actions[2].type).toBe('data/fetchReviews/pending');

    expect(screen.getByText('Product Screen')).toBeInTheDocument();

  });

});
