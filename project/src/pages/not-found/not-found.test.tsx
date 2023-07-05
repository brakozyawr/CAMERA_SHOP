import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import NotFoundScreen from './not-found';
import HistoryRouter from '../../components/history-route/history-route';
import {createMemoryHistory} from 'history';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFoundScreen />
        </HelmetProvider>
      </HistoryRouter>
    );

    const headerElement = screen.getByText('404. Страница не найдена');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
