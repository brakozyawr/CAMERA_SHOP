import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import Footer from './footer';

import HistoryRouter from '../history-route/history-route';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';


const history = createMemoryHistory();
const mockStore = configureMockStore();


describe('Component: Footer', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog);
    const store = mockStore({});

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Footer />
          </HelmetProvider>
        </HistoryRouter >
      </Provider>);

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Ресурсы/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Курсы операторов/i)).toBeInTheDocument();
    expect(screen.getByText(/Задать вопрос/i)).toBeInTheDocument();
    expect(screen.getByTestId('logo-link')).toBeInTheDocument();

  });


  it('should switching to catalog-page if the link is clicked,',async () => {
    const store = mockStore({});
    history.push(`${AppRoute.Product}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Footer />
            <Routes>
              <Route
                path={AppRoute.Catalog}
                element={<h1>Catalog Screen</h1>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter >
      </Provider>
    );

    expect(screen.queryByText('Catalog Screen')).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('logo-link'));

    expect(screen.getByText('Catalog Screen')).toBeInTheDocument();

  });

});
