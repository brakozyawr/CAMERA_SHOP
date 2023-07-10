import {TProduct} from '../../types/types';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import cn from 'classnames';
import {MouseEvent, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {setCandidateForBasket} from '../../store/basket-data/basket-data';
import {Link, Navigate, useLocation} from 'react-router-dom';


type ProductDescriptionProps = {
  product: TProduct | null;
  setAddItemPopupState: (addItemPopupState: boolean) => void;
}

function ProductDescription({product, setAddItemPopupState}: ProductDescriptionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();

  type TTabState = {
    [propertyName: string]: boolean;
  }

  let initialTabState: TTabState = {
    characteristic: true,
    description: false,
  };

  const tabInLocation = new URLSearchParams(location.search).get('tab');
  const tabs = Object.keys(initialTabState);
  const isIncludedInTabs = tabs.find((item)=>item === tabInLocation);

  if(tabInLocation === null){
    initialTabState = {
      characteristic: true,
      description: false,
    };
  }
  if(tabInLocation !== null && isIncludedInTabs ){
    initialTabState = Object.fromEntries(
      Object.entries(initialTabState).map(
        ([key, value]) => tabInLocation === key ? [key, true] : [key, false]
      )
    );
  }

  const [tabState, setTabState] = useState(initialTabState);

  const toggleState = (target: EventTarget | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>{
    const element = target as HTMLElement;
    const keyValue = element.dataset.tabsType;

    const newTabState = Object.fromEntries(
      Object.entries(tabState).map(
        ([key, value]) => keyValue === key ? [key, true ] : [key, false ]
      )
    );
    setTabState(newTabState);
  };

  if(tabInLocation !== null && !isIncludedInTabs ){
    //return <Navigate to="/*" replace />;
  }

  if(product){
    return (
      <div className="page-content__section">
        <section className="product">
          <div className="container">
            <div className="product__img">
              <picture>
                <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`} />
                <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x} 2x`} width="560" height="480"
                  alt={product.name}
                />
              </picture>
            </div>
            <div className="product__content">
              <h1 className="title title--h3">{product.name}</h1>
              <div className="rate product__rate">
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
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
              </div>
              <p className="product__price"><span className="visually-hidden">Цена:</span>{`${product.price} ₽`}</p>
              <button
                className="btn btn--purple"
                type="button"
                data-testid="add-to-card-button"
                onClick={()=>{
                  dispatch(setCandidateForBasket(product.id));
                  setAddItemPopupState(true);
                }}
              >
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"/>
                </svg>
                Добавить в корзину
              </button>
              <div className="tabs product__tabs">
                <div className="tabs__controls product__tabs-controls">
                  <Link to={'?tab=characteristic'}>
                    <button
                      onClick={(evt) => {
                        toggleState(evt.target);
                      }}
                      className={cn('tabs__control', {'is-active': tabState.characteristic})}
                      type="button"
                      data-tabs-type="characteristic"
                      data-testid="characteristic"
                    >Характеристики
                    </button>
                  </Link>
                  <Link to={'?tab=description'}>
                    <button
                      onClick={(evt) => {
                        toggleState(evt.target);
                      }}
                      className={cn('tabs__control', {'is-active': tabState.description})}
                      type="button"
                      data-tabs-type="description"
                      data-testid="description"
                    >Описание
                    </button>
                  </Link>
                </div>
                <div className="tabs__content">
                  <div className={cn('tabs__element', {'is-active': tabState.characteristic})}>
                    <ul className="product__tabs-list">
                      <li className="item-list"><span className="item-list__title">Артикул:</span>
                        <p className="item-list__text"> {product.vendorCode}</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Категория:</span>
                        <p className="item-list__text">{product.category}</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                        <p className="item-list__text">{product.type}</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Уровень:</span>
                        <p className="item-list__text">{product.level}</p>
                      </li>
                    </ul>
                  </div>
                  <div className={cn('tabs__element', {'is-active': tabState.description,})}>
                    <div className="product__tabs-text">
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }else{
    return <LoadingScreen />;
  }
}

export default ProductDescription;
