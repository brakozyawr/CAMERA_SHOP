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
const product = makeFakeProduct();
const similarProducts = makeFakeProducts();
const reviews = makeFakeReviews();

const store = mockStore({
  [NameSpace.Product]: {product: product, similarProducts: similarProducts, reviews: reviews, isProductDataLoaded: false},
});


describe('Component: Product', () => {
  it('should render correctly', () => {
    history.push(`${AppRoute.Product}${product.id}`);

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={`${AppRoute.Product}${product.id}`}
                element={<Product />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getAllByText(product.name).length).toBe(screen.getAllByText(product.name).length);
    expect(screen.getAllByText(product.type).length).toBe(screen.getAllByText(product.type).length);
    expect(screen.getAllByText(product.category).length).toBe(screen.getAllByText(product.category).length);
    expect(screen.getAllByText(product.level).length).toBe(screen.getAllByText(product.level).length);
    expect(screen.getAllByText(product.reviewCount).length).toBe(screen.getAllByText(product.reviewCount).length);

    expect(screen.getAllByText(similarProducts[2].name).length).toBe(screen.getAllByText(similarProducts[2].name).length);
    expect(screen.getAllByText(`${similarProducts[2].reviewCount}`).length).toBe(screen.getAllByText(similarProducts[2].reviewCount).length);
    expect(screen.getAllByText(reviews[1].disadvantage).length).toBe(screen.getAllByText(reviews[1].disadvantage).length);
    expect(screen.getAllByText(reviews[0].advantage).length).toBe(screen.getAllByText(reviews[0].advantage).length);
  });
});
