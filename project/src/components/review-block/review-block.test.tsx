import {render, screen} from '@testing-library/react';
import {makeFakeReviews} from '../../utils/mocks';
import ReviewBlock from './review-block';
import userEvent from '@testing-library/user-event';


jest.mock('../review-card/review-card', () => {
  const mockReviewCard = () => <>This is mock ReviewCard</>;

  return {
    __esModule: true,
    default: mockReviewCard,
  };
});

const reviews = makeFakeReviews();
const setReviewPopupState = jest.fn();

describe('Component: ReviewBlock', () => {
  it('should render correctly', async() => {
    render (
      <ReviewBlock
        reviews={reviews}
        setReviewPopupState={setReviewPopupState}
      />
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByTestId('add-review')).toBeInTheDocument();
    expect(screen.getByText(/This is mock ReviewCard/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('add-review'));

    expect(setReviewPopupState).toBeCalled();

  });
});
