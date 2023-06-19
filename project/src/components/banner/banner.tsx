import {TPromo} from '../../types/types';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';

export type BannerProps = {
  promo: TPromo|null;
}

function Banner({promo}: BannerProps): JSX.Element {
  const dispatch = useAppDispatch();

  if(promo){
    return (
      <div className="banner">
        <picture>
          <source type="image/webp" srcSet={`/${promo.previewImgWebp2x}, /${promo.previewImgWebp2x} 2x`}/>
          <img
            src={`${promo.previewImg}`} srcSet={`/${promo.previewImg} 2x`} width="1280" height="280"
            alt={promo.name}
          />
        </picture>
        <p className="banner__info">
          <span className="banner__message">Новинка!</span>
          <span className="title title--h1">{promo.name}</span>
          <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
          <Link
            onClick={() => {
              dispatch(fetchProductAction(promo.id));
              dispatch(fetchSimilarProductsAction(promo.id));
              dispatch(fetchReviewsAction(promo.id));
            }}
            className="btn"
            to={`${AppRoute.Product}${promo.id}`}
          >
            Подробнее
          </Link>
        </p>
      </div>
    );
  }else{
    return <div className="banner"></div>;
  }
}

export default Banner;
