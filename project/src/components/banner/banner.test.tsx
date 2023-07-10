import {makeFakePromo} from '../../utils/mocks';
import {fireEvent, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';

import HistoryRouter from '../../components/history-route/history-route';
import Banner from './banner';
import {AppRoute} from '../../const';
import {Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';


const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const promo = makeFakePromo();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Banner promo={promo}/>
          </HelmetProvider>
        </HistoryRouter >
      </Provider>
    );

    expect(screen.getByText(promo.name)).toBeInTheDocument();
    expect(screen.getByRole('link').textContent).toBe('Подробнее');

  });

  it('should fetch data if the link is clicked, switching to another product-page', () => {
    history.push(AppRoute.Catalog);
    const promo = makeFakePromo();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Banner promo={promo}/>
            <Routes>
              <Route
                path={`${AppRoute.Product}${promo.id}`}
                element={<h1>Product Screen</h1>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter >
      </Provider>
    );

    fireEvent.click(screen.getByRole('link'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('data/fetchProduct/pending');
    expect(actions[1].type).toBe('data/fetchSimilarProducts/pending');
    expect(actions[2].type).toBe('data/fetchReviews/pending');

    expect(screen.getByText('Product Screen')).toBeInTheDocument();

  });

});
