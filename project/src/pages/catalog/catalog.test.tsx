import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import Catalog from './catalog';
import {AppRoute, NameSpace} from '../../const';
import {makeFakeProducts, makeFakePromo} from '../../utils/mocks';

const mockStore = configureMockStore();

const history = createMemoryHistory();
const fakeProducts = makeFakeProducts();
const fakePromo = makeFakePromo();


const store = mockStore({
  [NameSpace.Catalog]: {products: fakeProducts, promo: fakePromo, isCatalogDataLoaded: false},
});

jest.mock('../../components/banner/banner', () => {
  const mockBanner = () => <>This is mock Banner</>;

  return {
    __esModule: true,
    default: mockBanner,
  };
});

jest.mock('../../components/breadcrumbs/breadcrumbs', () => {
  const mockBreadcrumbs = () => <>This is mock Breadcrumbs</>;

  return {
    __esModule: true,
    default: mockBreadcrumbs,
  };
});

jest.mock('../../components/catalog-aside/catalog-aside', () => {
  const mockCatalogAside = () => <>This is mock CatalogAside</>;

  return {
    __esModule: true,
    default: mockCatalogAside,
  };
});

jest.mock('../../components/catalog-content/catalog-content', () => {
  const mockCatalogContent = () => <>This is mock CatalogContent</>;

  return {
    __esModule: true,
    default: mockCatalogContent,
  };
});

describe('Component: Catalog', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Catalog}
                element={<Catalog/>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();

    expect(screen.getByText(/This is mock Banner/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Breadcrumbs/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock CatalogAside/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock CatalogContent/i)).toBeInTheDocument();
  });

});


