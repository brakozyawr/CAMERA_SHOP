import {fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';
import {TProduct} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {setCandidateForBasket} from '../../store/basket-data/basket-data';


type ProductSimilarSliderCardProps = {
  similarProduct: TProduct;
  setAddItemPopupState: (addItemPopupState: boolean) => void;
}

function ProductSimilarSliderCard({similarProduct, setAddItemPopupState}: ProductSimilarSliderCardProps): JSX.Element {
  const dispatch = useAppDispatch();

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
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"/>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"/>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"/>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"/>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"/>
          </svg>
          <p className="visually-hidden">Рейтинг: 4</p>
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
