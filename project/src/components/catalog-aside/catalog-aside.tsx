import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TProduct, TSelectedFilters} from '../../types/types';
import {filterProducts} from '../../store/catalog-data/catalog-data';
import {fetchRangeProductAction} from '../../store/api-actions';
import {getSearchRrequestString, sortProducts} from '../../util';
import {filterProperty, Property, Sorting} from '../../const';
import {getAbsolyteMaxPrice, getAbsolyteMinPrice, getCurrentFilters, getCurrentPriceRangeProductsIdList,} from '../../store/catalog-data/selectors';


type CatalogAsideProps = {
  productList: TProduct[];
}

function CatalogAside({productList}:CatalogAsideProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentfilters = structuredClone(useAppSelector(getCurrentFilters)) as TSelectedFilters;
  let [selectedFilters]:[TSelectedFilters, React.Dispatch<React.SetStateAction<TSelectedFilters>>] = useState(currentfilters);
  console.log(currentfilters);

  const ABSOLYTE_MIN_PRICE = useAppSelector(getAbsolyteMinPrice);
  const ABSOLYTE_MAX_PRICE = useAppSelector(getAbsolyteMaxPrice);

  const currentPriceRangeProductsIdList = useAppSelector(getCurrentPriceRangeProductsIdList);
  const sortedCurrentProductList = sortProducts(productList.slice(), Sorting.Up, Property.Price);
  const CURRENT_MIN_PRICE = sortedCurrentProductList[0].price;
  const CURRENT_MAX_PRICE = sortedCurrentProductList[sortedCurrentProductList.length - 1].price;

  const [priceFrom, setPriceFrom] = useState(CURRENT_MIN_PRICE);
  const [priceUp, setPriceUp] = useState(CURRENT_MAX_PRICE);

  useEffect(() => {
    setPriceFrom(CURRENT_MIN_PRICE);
    setPriceUp(CURRENT_MAX_PRICE);
    //console.log(CURRENT_MIN_PRICE);
    //console.log(CURRENT_MAX_PRICE);
  }, [CURRENT_MIN_PRICE, CURRENT_MAX_PRICE]);

  const isVideoCameraState = Boolean(('category' in selectedFilters) ? selectedFilters['category'].find((item:string) => item === filterProperty.Videocamera) : false);
  const isPhotoCameraState = Boolean(('category' in selectedFilters) ? selectedFilters['category'].find((item:string) => item === filterProperty.Photocamera) : false);

  const [isVideoCamera, setVideoCameraState] = useState(isVideoCameraState);
  const [isPhotoCamera, setPhotoCameraState] = useState(isPhotoCameraState);


  const removeExcessItem = (key: string, name: string) => {
    let excessItem: number;
    if(key in selectedFilters){
      excessItem = selectedFilters[key].findIndex((item) => item === name);
      if(excessItem >= 0){
        selectedFilters[key].splice(excessItem, 1);
      }
    }
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
    //console.log(selectedFilters);
    dispatch(filterProducts(selectedFilters));
    getSearchRrequestString(selectedFilters);
  };

  useEffect(() => {
    if(currentPriceRangeProductsIdList.length){
      selectedFilters.id = currentPriceRangeProductsIdList;
    }
    // console.log(selectedFilters);
    dispatch(filterProducts(selectedFilters));
  }, [currentPriceRangeProductsIdList]);

  const debouncedPriceChangeHandle = (name: string, value: string) => {
    //console.log(value);
    if(name === 'price'){
      if (Number(value) > Number(priceUp)) {
        setPriceFrom(Number(priceUp));
        dispatch(fetchRangeProductAction({min: Number(priceUp), max: Number(priceUp)}));
        //console.log('price value > priceUp');
      }
      if (Number(value) < Number(ABSOLYTE_MIN_PRICE)) {
        setPriceFrom(ABSOLYTE_MIN_PRICE);
        dispatch(fetchRangeProductAction({min: Number(ABSOLYTE_MIN_PRICE), max: Number(priceUp)}));
        //console.log('price value < ABSOLYTE_MIN_PRICE');
      }
      if (Number(value) >= Number(ABSOLYTE_MIN_PRICE) && Number(value) <= Number(priceUp)) {
        dispatch(fetchRangeProductAction({min: Number(value), max: Number(priceUp)}));
        //console.log('norm');
        //console.log(priceUp);
        //console.log(priceFrom);
      }
    }

    if(name === 'priceUp'){
      if (Number(value) < Number(priceFrom)) {
        setPriceUp(priceFrom);
        dispatch(fetchRangeProductAction({min: Number(priceFrom), max: Number(priceFrom)}));
        //console.log('priceUp value < priceFrom');
      }
      if (Number(value) > Number(ABSOLYTE_MAX_PRICE)) {
        setPriceUp(ABSOLYTE_MAX_PRICE);
        dispatch(fetchRangeProductAction({min: Number(priceFrom), max: Number(ABSOLYTE_MAX_PRICE)}));
        //console.log('priceUp value > ABSOLYTE_MAX_PRICE');
      }
      if (Number(value) <= Number(ABSOLYTE_MAX_PRICE) && Number(value) >= Number(priceFrom)) {
        dispatch(fetchRangeProductAction({min: Number(priceFrom), max: Number(value)}));
        //console.log('norm');
      }
    }
  };

  const timerDebounceRef: React.MutableRefObject<number> = useRef(0);
  function debounce(name:string, value:string){
    if(timerDebounceRef.current){
      clearTimeout(timerDebounceRef.current);
    }
    timerDebounceRef.current = window.setTimeout(() => {
      debouncedPriceChangeHandle(name, value);
    }, 1500);
  }

  const priceChangeHandle = (evt:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target as HTMLInputElement;

    if(name === 'price' && Number(value) >= 0){
      setPriceFrom(Number(value));
    }
    if(name === 'priceUp' && Number(value) >= 0){
      setPriceUp(Number(value));
    }
    debounce(name, value);
    console.log(selectedFilters);
  };

  const resetFilter = () => {
    selectedFilters = {};
    setVideoCameraState(false);
    setPhotoCameraState(false);
    setPriceFrom(ABSOLYTE_MIN_PRICE);
    setPriceUp(ABSOLYTE_MAX_PRICE);
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
                    placeholder={String(CURRENT_MIN_PRICE)}
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
                    placeholder={String(CURRENT_MAX_PRICE)}
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
                  checked={Boolean(('type' in selectedFilters) ? selectedFilters['type'].find((item:string) => item === filterProperty.Digital) : false)}
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
                  checked={Boolean(('type' in selectedFilters) ? selectedFilters['type'].find((item:string) => item === filterProperty.Film) : false)}
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
                  checked={Boolean(('type' in selectedFilters) ? selectedFilters['type'].find((item:string) => item === filterProperty.Snapshot) : false)}
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
                  checked={Boolean(('type' in selectedFilters) ? selectedFilters['type'].find((item:string) => item === filterProperty.Collection) : false)}
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
                  checked={Boolean(('level' in selectedFilters) ? selectedFilters['level'].find((item:string) => item === filterProperty.Zero) : false)}
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
                  checked={Boolean(('level' in selectedFilters) ? selectedFilters['level'].find((item:string) => item === filterProperty.NonProfessional) : false)}
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
                  checked={Boolean(('level' in selectedFilters) ? selectedFilters['level'].find((item:string) => item === filterProperty.Professional) : false)}
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
