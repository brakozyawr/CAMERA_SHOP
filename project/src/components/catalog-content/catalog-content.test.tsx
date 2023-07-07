import {render, screen} from '@testing-library/react';
import CatalogContent from './catalog-content';
import {makeFakeProducts} from '../../utils/mocks';
import {TProduct} from '../../types/types';


jest.mock('../catalog-sort/catalog-sort', () => {
  const mockCatalogSort = () => <>This is mock CatalogSort</>;

  return {
    __esModule: true,
    default: mockCatalogSort,
  };
});

jest.mock('../cards/cards', () => {
  const mockCards = () => <>This is mock Cards</>;

  return {
    __esModule: true,
    default: mockCards,
  };
});

jest.mock('../pagination/pagination', () => {
  const mockPagination = () => <>This is mock Pagination</>;

  return {
    __esModule: true,
    default: mockPagination,
  };
});


describe('Component: CatalogContent', () => {
  it('should render correctly', () => {

    const step = 9;
    const currentPageNumber = 1;
    const cutProducts: TProduct[] = makeFakeProducts().slice((currentPageNumber - 1) * step, currentPageNumber * step);
    const pageCount: number = Math.ceil(makeFakeProducts().length / step);

    render (
      <CatalogContent
        products={cutProducts}
        pageCount={pageCount}
        currentPageNumber={currentPageNumber}
        getPage={jest.fn()}
        setAddItemPopupState={jest.fn()}
      />);

    expect(screen.getByText(/This is mock CatalogSort/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Cards/i)).toBeInTheDocument();
    expect(screen.getByText(/This is mock Pagination/i)).toBeInTheDocument();

  });
});
