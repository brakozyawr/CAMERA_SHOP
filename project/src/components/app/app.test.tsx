import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AppRoute, NameSpace} from '../../const';
import App from './app';
import {makeFakeProduct, makeFakeProducts, makeFakePromo, makeFakeReviews} from '../../utils/mocks';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Catalog]: {products: makeFakeProducts, promo: makeFakePromo, isCatalogDataLoaded: false},
  [NameSpace.Product]: {product: makeFakeProduct, similarProducts: makeFakeProducts, reviews: makeFakeReviews, isProductDataLoaded: false},
  [NameSpace.Basket]: {basketList: [], candidateForBasketList: 2},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "Catalog" when user navigate to "/catalog/"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "Product)" when user navigate to "/catalog/product/"', () => {
    history.push(`${AppRoute.Product}${2}`);
    render(fakeApp);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
