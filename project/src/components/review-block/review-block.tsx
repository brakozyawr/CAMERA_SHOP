import ReviewCard from '../review-card/review-card';
import {TReview} from '../../types/types';
import {useState} from 'react';
import dayjs from 'dayjs';

type ReviewBlockProps = {
  reviews: TReview[];
  setReviewPopupState: (reviewPopupState: boolean) => void;
}

function getWeightForNullDate(dateA: string, dateB: string) {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
}

/*function sortReviewsUp(reviewA: TReview, reviewB: TReview) {
  const weight = getWeightForNullDate(reviewA.createAt, reviewB.createAt);
  return weight ?? dayjs(reviewA.createAt).diff(dayjs(reviewB.createAt));
}*/

function sortReviewsDown(reviewA: TReview, reviewB: TReview) {
  const weight = getWeightForNullDate(reviewA.createAt, reviewB.createAt);

  return weight ?? dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));
}

function ReviewBlock({reviews, setReviewPopupState}: ReviewBlockProps): JSX.Element {
  const step = 3;
  const INITIAL_REVIEW_COUNT = 3;

  const [renderedReviewCount, setCount] = useState(INITIAL_REVIEW_COUNT);
  console.log(reviews);
  const sortedReviews: TReview[] = reviews.slice().sort(sortReviewsDown) ;
  console.log(sortedReviews);
  const cutReviews: TReview[] = sortedReviews.slice(0, renderedReviewCount);


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
