import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import {makeFakeProduct} from '../../utils/mocks';
import ReviewForm from './review-form';

import HistoryRouter from '../history-route/history-route';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';


const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const product = makeFakeProduct();
const setReviewPopupState = jest.fn();
const setReviewSuccessPopupState = jest.fn();


describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Product);
    const store = mockStore({});

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ReviewForm
              productId={product.id}
              setReviewPopupState={setReviewPopupState}
              setReviewSuccessPopupState={setReviewSuccessPopupState}
            />
          </HelmetProvider>
        </HistoryRouter >
      </Provider>);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-button').textContent).toBe('Отправить отзыв');
    expect(screen.getByTestId('close-button')).toBeInTheDocument();

  });


  it('проверит работу формы', async () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ReviewForm
              productId={product.id}
              setReviewPopupState={setReviewPopupState}
              setReviewSuccessPopupState={setReviewSuccessPopupState}
            />
          </HelmetProvider>
        </HistoryRouter >
      </Provider>
    );

    const [starA, starB, starC, starD, starE, ] = screen.queryAllByRole('radio');

    await userEvent.click(starA);
    await userEvent.click(starB);
    await userEvent.click(starC);
    await userEvent.click(starD);
    await userEvent.click(starE);

    await userEvent.type(screen.getByTestId('userName'), 'keks');
    await userEvent.type(screen.getByTestId('advantage'), 'Рмяу!');
    await userEvent.type(screen.getByTestId('disadvantage'), 'Мяуррр!');
    await userEvent.type(screen.getByTestId('review'), 'МЯУ!!!');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Рмяу!/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Мяуррр!/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/МЯУ!!!/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('submit-button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('user/addReview/pending');

    await userEvent.click(screen.getByTestId('close-button'));
    expect(setReviewPopupState).toBeCalled();

  });

  it('проверит работу формы, когда не все поля заполнены', async () => {
    const store = mockStore({});
    store.clearActions();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ReviewForm
              productId={product.id}
              setReviewPopupState={setReviewPopupState}
              setReviewSuccessPopupState={setReviewSuccessPopupState}
            />
          </HelmetProvider>
        </HistoryRouter >
      </Provider>
    );

    const [starA, starB, starC, starD, starE, ] = screen.queryAllByRole('radio');

    await userEvent.click(starA);
    await userEvent.click(starB);
    await userEvent.click(starC);
    await userEvent.click(starD);
    await userEvent.click(starE);

    await userEvent.type(screen.getByTestId('userName'), 'keks');
    await userEvent.type(screen.getByTestId('advantage'), 'Рмяу!');
    await userEvent.type(screen.getByTestId('review'), 'МЯУ!!!');
    await userEvent.click(screen.getByTestId('submit-button'));

    const actions = store.getActions();

    expect(actions[0]).toBe(undefined);

  });

});
