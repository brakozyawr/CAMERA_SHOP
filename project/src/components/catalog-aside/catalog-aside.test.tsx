import {render, screen} from '@testing-library/react';
import CatalogAside from './catalog-aside';

describe('Component: CatalogAside', () => {
  it('should render correctly', () => {
    render(<CatalogAside />);

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
  });
});
