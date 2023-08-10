import {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProducts} from '../../store/catalog-data/selectors';
import {TProduct} from '../../types/types';
import {filteredProducts} from '../../store/catalog-data/catalog-data';


let checkedCheckbox: {[key: string]: string[]} = {};

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


function CatalogAside(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const [isVideoCamera, setVideoCameraState] = useState(false);
  const [isPhotoCamera, setPhotoCameraState] = useState(false);

  const removeExcessItem = (key: string, name: string) => {
    let excessItem: number;

    if(key in checkedCheckbox){
      excessItem = checkedCheckbox[key].findIndex((item) => item === name);
      if(excessItem >= 0){
        checkedCheckbox[key].splice(excessItem, 1);
      }
    }
  };

  const getFilteredProducts = (checkedCheckboxList:{[key: string]: string[]}) => {
    let filteredProductsList: TProduct[] = [];
    let productsList: TProduct[];

    for (const key in checkedCheckboxList) {
      filteredProductsList.length ? productsList = filteredProductsList : productsList = products;
      const parameter = key as keyof TProduct;

      const filteredArr = productsList.filter((product) =>
        product[parameter] === checkedCheckboxList[parameter].find((property) => product[parameter] === property)
      );

      filteredProductsList = filteredProductsList.length ? filteredArr : filteredProductsList.concat(filteredArr);

    }
    console.log(filteredProductsList);
    if(filteredProductsList.length){
      dispatch(filteredProducts(filteredProductsList));
    }else{
      dispatch(filteredProducts(products));
    }
  };

  const fieldChangeHandle = (evt:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, checked, dataset} = evt.target as HTMLInputElement;
    const {setKey} = dataset;

    if(checked){
      if(setKey as string in checkedCheckbox ){
        checkedCheckbox[setKey as string].push(name);
      }else{
        checkedCheckbox[setKey as string] = [name];
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

    getFilteredProducts(checkedCheckbox);
  };

  const resetFilter = () => {
    checkedCheckbox = {};
    setVideoCameraState(false);
    setPhotoCameraState(false);
    dispatch(filteredProducts([]));
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
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до" />
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
                  onChange={fieldChangeHandle}
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
                  onChange={fieldChangeHandle}
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
                  onChange={fieldChangeHandle}
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
                  onChange={fieldChangeHandle}
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
                  onChange={fieldChangeHandle}
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
                  onChange={fieldChangeHandle}
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
                  onChange={fieldChangeHandle}
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
                  onChange={fieldChangeHandle}
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
                  onChange={fieldChangeHandle}
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
