import {render, screen} from '@testing-library/react';
import {makeFakeProducts} from '../../utils/mocks';
import ProductSimilar from './product-similar';


jest.mock('../product-similar-slider-card/product-similar-slider-card', () => {
  const mockProductSimilarSliderCard = () => <>This is mock ProductSimilarSliderCard</>;

  return {
    __esModule: true,
    default: mockProductSimilarSliderCard,
  };
});

const similarProducts = makeFakeProducts();

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    render (
      <ProductSimilar
        similarProducts={similarProducts}
        setAddItemPopupState={jest.fn}
      />
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getAllByText(/This is mock ProductSimilarSliderCard/i).length).toBe(similarProducts.length);
  });
});
