import {render, screen} from '@testing-library/react';
import {makeFakeProducts} from '../../utils/mocks';
import Cards from './cards';


jest.mock('../card/card', () => {
  const mockCard = () => <>This is mock Card</>;

  return {
    __esModule: true,
    default: mockCard,
  };
});

describe('Component: Cards', () => {
  it('should render correctly', () => {

    render ( <Cards products={makeFakeProducts()} setAddItemPopupState={jest.fn}/>);

    expect(screen.getByText(/This is mock Card/i)).toBeInTheDocument();
  });
});
