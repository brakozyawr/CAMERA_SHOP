import {useAppDispatch, useAppSelector} from '../../hooks';
import {addItemToBasket} from '../../store/action';
import {TProduct} from '../../types/types';

type CatalogAddItemprops = {
  setAddItemPopupState: (addItemPopupState: boolean) => void;
}

function CatalogAddItem({setAddItemPopupState}:CatalogAddItemprops): JSX.Element {
  const dispatch = useAppDispatch();
  const {candidateForBasketList} = useAppSelector((state) => state);
  const product: TProduct|null = candidateForBasketList;

  return (
    <div className="modal is-active">
      {product &&
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={() => {
              setAddItemPopupState(false);
            }}
          />
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`/${product.previewImgWebp2x}, /${product.previewImgWebp2x} 2x`}/>
                  <img
                    src={`/${product.previewImg}`} srcSet={`/${product.previewImg} 2x`} width="280" height="240"
                    alt={product.name}
                  />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{product.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул: </span>
                    <span className="basket-item__number">{product.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{product.category}</li>
                  <li className="basket-item__list-item">{product.level}</li>
                </ul>
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${product.price} ₽`}</p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={()=>{
                  dispatch(addItemToBasket());
                  setAddItemPopupState(false);
                }}
              >
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"/>
                </svg>
                Добавить в корзину
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => {
                setAddItemPopupState(false);
              }}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"/>
              </svg>
            </button>
          </div>
        </div>}
    </div>
  );
}

export default CatalogAddItem;
