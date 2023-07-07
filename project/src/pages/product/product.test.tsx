import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import Product from './product';
import {AppRoute, NameSpace} from '../../const';
import {makeFakeProduct, makeFakeProducts, makeFakeReviews} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.Product]: {product: makeFakeProduct(), similarProducts: makeFakeProducts(), reviews: makeFakeReviews(), isProductDataLoaded: false},
});

jest.mock('../../components/breadcrumbs/breadcrumbs', () => {
  const mockBreadcrumbs = () => <>This is mock Breadcrumbs</>;

  return {
    __esModule: true,
    default: mockBreadcrumbs,
  };
});

jest.mock('../../components/product-description/product-description', () => {
  const mockProductDescription = () => <>This is mock ProductDescription</>;

  return {
    __esModule: true,
    default: mockProductDescription,
  };
});

jest.mock('../../components/product-similar/product-similar', () => {
  const mockProductSimilar = () => <>This is mock ProductSimilar</>;

  return {
    __esModule: true,
    default: mockProductSimilar,
  };
});

jest.mock('../../components/review-block/review-block', () => {
  const mockReviewBlock = () => <>This is mock ReviewBlock</>;

  return {
    __esModule: true,
    default: mockReviewBlock,
  };
});


describe('Component: Product', () => {
  it('should render correctly', () => {
    history.push(`${AppRoute.Product}:id`);

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={`${AppRoute.Product}:id`}
                element={<Product />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/This is mock Breadcrumbs/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock ProductDescription/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock ProductSimilar/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock ReviewBlock/i)).toBeInTheDocument();
  });
});
