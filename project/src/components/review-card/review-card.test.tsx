import {render, screen} from '@testing-library/react';
import {makeFakeReview} from '../../utils/mocks';
import ReviewCard from './review-card';


const review = makeFakeReview();

describe('Component: Cards', () => {
  it('should render correctly', () => {

    render (
      <ReviewCard
        key={review.id}
        review={review}
      />
    );

    expect(screen.getByText(review.userName)).toBeInTheDocument();

    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(review.advantage)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки:/i)).toBeInTheDocument();
    expect(screen.getByText(review.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
    expect(screen.getByText(review.review)).toBeInTheDocument();
  });
});
