import {TProduct} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';

type CardProps = {
  product:TProduct;
}

function Card({product}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${product.previewImgWebp2x}, ${product.previewImgWebp2x} 2x`} />
          <img
            src={product.previewImg} srcSet={`${product.previewImg} 2x`} width="280" height="240"
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${product.price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить </button>
        <Link
          onClick={() => {
            dispatch(fetchProductAction(product.id));
            dispatch(fetchSimilarProductsAction(product.id));
            dispatch(fetchReviewsAction(product.id));
          }}
          to={`${AppRoute.Product}${product.id}`}
          className="btn btn--transparent"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default Card;
