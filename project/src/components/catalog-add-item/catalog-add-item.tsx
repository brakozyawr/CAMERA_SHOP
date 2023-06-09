import {useAppDispatch, useAppSelector} from '../../hooks';
import {TProduct} from '../../types/types';
import {useEffect, useRef} from 'react';
import {getCandidateForBasketList} from '../../store/basket-data/selectors';
import {getProducts} from '../../store/catalog-data/selectors';
import {addItemToBasket} from '../../store/basket-data/basket-data';


type CatalogAddItemprops = {
  setAddItemPopupState: (addItemPopupState: boolean) => void;
}

function CatalogAddItem({setAddItemPopupState}:CatalogAddItemprops): JSX.Element {
  const dispatch = useAppDispatch();
  const candidateForBasketList = useAppSelector(getCandidateForBasketList);
  const products = useAppSelector(getProducts);

  const product: TProduct|undefined = products.find((item) =>
    item.id === candidateForBasketList
  );

  const modal = useRef<HTMLDivElement | null >(null);

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        setAddItemPopupState(false);
      }
    };
    document.addEventListener('keydown', onKeyDownEsc);
    document.body.classList.add('scroll-lock');

    if(modal.current){
      const focusableEls: NodeListOf<HTMLButtonElement> = modal.current.querySelectorAll('button:not([disabled])');
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      const KEYCODE_TAB = 9;
      firstFocusableEl.focus();
      modal.current.addEventListener('keydown', (evt) => {
        const isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
          return;
        }

        if ( evt.shiftKey ){
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            evt.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            evt.preventDefault();
          }
        }
      });
    }

    return () => {
      document.removeEventListener('keydown', onKeyDownEsc);
      document.body.classList.remove('scroll-lock');
      document.body.focus();
    };

  }, [setAddItemPopupState]);

  if (product) {
    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={() => {
              setAddItemPopupState(false);
            }}
          />
          <div className="modal__content" ref={modal} >
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
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${product.price.toLocaleString('ru-RU')} ₽`}</p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={()=>{
                  dispatch(addItemToBasket);
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
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={() => {
              setAddItemPopupState(false);
            }}
          />
          <div className="modal__content">
            <p className="title title--h4">Упс, что-то пошло не так )</p>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={()=>{
                setAddItemPopupState(false);
              }}
            >Убрать это
            </button>

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
        </div>
      </div>
    );
  }

}

export default CatalogAddItem;
