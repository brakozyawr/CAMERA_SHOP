import {fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TProduct} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {setCandidateForBasket} from '../../store/basket-data/basket-data';
import {getProducts} from '../../store/catalog-data/selectors';


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

type ProductSimilarSliderCardProps = {
  similarProduct: TProduct;
  setAddItemPopupState: (addItemPopupState: boolean) => void;
}

function ProductSimilarSliderCard({similarProduct, setAddItemPopupState}: ProductSimilarSliderCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const product = products.find((item) => item.id === similarProduct.id);

  const rating = product?.rating;

  return (
    <div className="product-card is-active">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${similarProduct.previewImgWebp}, /${similarProduct.previewImgWebp2x} 2x`} />
          <img
            src={`/${similarProduct.previewImg}`} srcSet={`/${similarProduct.previewImg2x} 2x`} width="280" height="240"
            alt="Фотоаппарат FastShot MR-5"
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {rating && getStars(rating)}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{similarProduct.reviewCount}</p>
        </div>
        <p className="product-card__title">{similarProduct.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${similarProduct.price.toLocaleString('ru-RU')} ₽`}</p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={()=>{
            dispatch(setCandidateForBasket(similarProduct.id));
            setAddItemPopupState(true);
          }}
        >Купить
        </button>
        <Link
          className="btn btn--transparent"
          to={`${AppRoute.Product}${similarProduct.id}`}
          onClick={() => {
            dispatch(fetchProductAction(similarProduct.id));
            dispatch(fetchSimilarProductsAction(similarProduct.id));
            dispatch(fetchReviewsAction(similarProduct.id));
          }}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductSimilarSliderCard;
