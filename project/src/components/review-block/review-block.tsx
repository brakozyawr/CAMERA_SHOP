import ReviewCard from '../review-card/review-card';
import {TReview} from '../../types/types';
import {useState} from 'react';

type ReviewBlockProps = {
  reviews: TReview[];
  setReviewPopupState: (reviewPopupState: boolean) => void;
}

function ReviewBlock({reviews, setReviewPopupState}: ReviewBlockProps): JSX.Element {
  const step = 3;
  const INITIAL_REVIEW_COUNT = 3;

  const [renderedReviewCount, setCount] = useState(INITIAL_REVIEW_COUNT);
  const cutReviews: TReview[] = reviews.slice(0, renderedReviewCount);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              className="btn"
              type="button"
              onClick={() => {
                setReviewPopupState(true);
              }}
            >Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {cutReviews.map((review: TReview) =>
              (
                <ReviewCard
                  key={review.id}
                  review={review}
                />
              ))}
          </ul>
          <div className="review-block__buttons">
            {(renderedReviewCount < reviews.length) &&
              <button
                className="btn btn--purple"
                type="button"
                onClick={() => {
                  setCount(renderedReviewCount + step);
                }}
              >Показать больше отзывов
              </button>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewBlock;
