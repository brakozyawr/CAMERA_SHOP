import {TProduct} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {
  fetchProductAction,
  fetchReviewsAction,
  fetchAllProductsReviewsAction,
  fetchSimilarProductsAction
} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCandidateForBasket} from '../../store/basket-data/basket-data';
import {useEffect} from 'react';
import {getAllProductsRatingList} from '../../store/catalog-data/selectors';

const getStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg width="17" height="16" aria-hidden="true" key={i}>
        <use xlinkHref={i <= rating ? '#icon-full-star' : '#icon-star' }/>
      </svg>
    );
  }
  return stars;
};

type CardProps = {
  product:TProduct;
  setAddItemPopupState: (addItemPopupState: boolean) => void;
}

function Card({product, setAddItemPopupState}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const allProductsratingList = useAppSelector(getAllProductsRatingList);

  useEffect(() => {
    if (!allProductsratingList.has(product.id)) {
      dispatch(fetchAllProductsReviewsAction(product.id));
    }
  }, []);

  const rating = allProductsratingList.get(product.id);

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${product.previewImgWebp2x}, /${product.previewImgWebp2x} 2x`} />
          <img
            src={`/${product.previewImg}`} srcSet={`/${product.previewImg} 2x`} width="280" height="240"
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {rating && getStars(rating)}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${product.price.toLocaleString('ru-RU')} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={()=>{
            dispatch(setCandidateForBasket(product.id));
            setAddItemPopupState(true);
          }}
        >Купить
        </button>
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
