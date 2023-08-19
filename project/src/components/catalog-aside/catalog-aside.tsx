import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TProduct, TSelectedFilters} from '../../types/types';
import {filterProducts} from '../../store/catalog-data/catalog-data';
import {fetchRangeProductAction} from '../../store/api-actions';
import {sortProducts} from '../../util';
import {Property, Sorting} from '../../const';
import {getCurrentPriceRangeProductsIdList} from '../../store/catalog-data/selectors';


export enum filterProperty {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный',
}


type CatalogAsideProps = {
  productList: TProduct[];
}

//let selectedFilters:TSelectedFilters = {};

function CatalogAside({productList}:CatalogAsideProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFilters]:[TSelectedFilters, React.Dispatch<React.SetStateAction<TSelectedFilters>>] = useState({});


  //const products = useAppSelector(getProducts);
  const currentPriceRangeProductsIdList = useAppSelector(getCurrentPriceRangeProductsIdList);
  const sortedProductList = sortProducts(productList.slice(), Sorting.Up, Property.Price);

  const MIN_PRICE = sortedProductList.length ? sortedProductList[0].price : '';
  const MAX_PRICE = sortedProductList.length ? sortedProductList[sortedProductList.length - 1].price : '';


  const [priceFrom, setPriceFrom] = useState('');
  const [priceUp, setPriceUp] = useState('');

  const [isVideoCamera, setVideoCameraState] = useState(false);
  const [isPhotoCamera, setPhotoCameraState] = useState(false);


  const removeExcessItem = (key: string, name: string) => {
    let excessItem: number;
    if(key in selectedFilters){
      excessItem = selectedFilters[key].findIndex((item) => item === name);
      if(excessItem >= 0){
        selectedFilters[key].splice(excessItem, 1);
      }
    }
    console.log(selectedFilters);
  };

  const checkboxChangeHandle = (evt:ChangeEvent<HTMLInputElement>) => {
    const {name, checked, dataset} = evt.target as HTMLInputElement;
    const {setKey} = dataset;

    if(checked){
      if(setKey as string in selectedFilters ){
        selectedFilters[setKey as string].push(name);
      }else{
        selectedFilters[setKey as string] = [name];
      }
    }else{
      removeExcessItem(setKey as string, name);
    }

    if(name === filterProperty.Videocamera){
      if(checked){
        setPhotoCameraState(false);
        removeExcessItem(setKey as string, filterProperty.Photocamera);
        //removeExcessItem('type', filterProperty.Film);
        //removeExcessItem('type', filterProperty.Snapshot);
        setVideoCameraState(true);
      }else{
        setVideoCameraState(false);
      }
    }
    if(name === filterProperty.Photocamera){
      if(checked){
        setVideoCameraState(false);
        removeExcessItem(setKey as string, filterProperty.Videocamera);
        setPhotoCameraState(true);
      }else{
        setPhotoCameraState(false);
      }
    }
    console.log(selectedFilters);
    dispatch(filterProducts(selectedFilters));
  };

  /*useEffect(() => {
    dispatch(fetchRangeProductAction({min: Number(priceFrom), max: Number(priceUp)}));
  }, [priceFrom, priceUp]);*/

  useEffect(() => {
    if(currentPriceRangeProductsIdList.length){
      selectedFilters.id = currentPriceRangeProductsIdList;
    }
    console.log(selectedFilters);
    dispatch(filterProducts(selectedFilters));
  }, [currentPriceRangeProductsIdList]);

  const priceChangeHandle = (evt:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target as HTMLInputElement;
    if(name === 'price' && Number(value) >= 0){
      setPriceFrom(value);
      dispatch(fetchRangeProductAction({min: Number(value), max: Number(priceUp)}));
    }
    if(name === 'priceUp' && Number(value) >= 0){
      setPriceUp(value);
      dispatch(fetchRangeProductAction({min: Number(priceFrom), max: Number(value)}));
    }
    console.log(selectedFilters);
  };

  const resetFilter = () => {
    selectedFilters = {};
    setVideoCameraState(false);
    setPhotoCameraState(false);
    setPriceFrom('');
    setPriceUp('');
    dispatch(filterProducts(selectedFilters));
  };


  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    value={priceFrom}
                    placeholder={String(MIN_PRICE)}
                    min="0"
                    onChange={priceChangeHandle}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    value={priceUp}
                    placeholder={String(MAX_PRICE)}
                    min="0"
                    onChange={priceChangeHandle}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="category"
                  name={filterProperty.Photocamera}
                  onChange={checkboxChangeHandle}
                  checked={isPhotoCamera}
                />
                <span className="custom-checkbox__icon"/>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="category"
                  name={filterProperty.Videocamera}
                  onChange={checkboxChangeHandle}
                  checked={isVideoCamera}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="type"
                  name={filterProperty.Digital}
                  onChange={checkboxChangeHandle}
                />
                <span className="custom-checkbox__icon"/>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="type"
                  name={filterProperty.Film}
                  disabled={isVideoCamera}
                  onChange={checkboxChangeHandle}
                />
                <span className="custom-checkbox__icon"/>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="type"
                  name={filterProperty.Snapshot}
                  disabled={isVideoCamera}
                  onChange={checkboxChangeHandle}
                />
                <span className="custom-checkbox__icon"/>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="type"
                  name={filterProperty.Collection}
                  onChange={checkboxChangeHandle}
                />
                <span className="custom-checkbox__icon"/>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="level"
                  name={filterProperty.Zero}
                  onChange={checkboxChangeHandle}
                />
                <span className="custom-checkbox__icon"/>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="level"
                  name={filterProperty.NonProfessional}
                  onChange={checkboxChangeHandle}
                />
                <span className="custom-checkbox__icon"/>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  data-set-key="level"
                  name={filterProperty.Professional}
                  onChange={checkboxChangeHandle}
                />
                <span className="custom-checkbox__icon"/>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={resetFilter}
          >Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogAside;
