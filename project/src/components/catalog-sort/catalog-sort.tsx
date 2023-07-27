import {useAppDispatch} from '../../hooks';
import {Property, Sorting} from '../../const';
import {useState} from 'react';
import {sortingProducts} from '../../store/catalog-data/catalog-data';


function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();
  const DEFAULT_SORTING_TYPE = Sorting.Up;
  const DEFAULT_PROPERTY_TYPE = Property.Price;
  const [currentSortingType, setSortingType] = useState(DEFAULT_SORTING_TYPE);
  const [currentPropertyType, setPropertyType] = useState(DEFAULT_PROPERTY_TYPE);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div
              className="catalog-sort__btn-text"
              onClick={()=>{
                dispatch(sortingProducts([currentSortingType, currentPropertyType]));
                setPropertyType(Property.Price);
              }}
            >
              <input type="radio" id="sortPrice" name="sort" />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div
              className="catalog-sort__btn-text"
              onClick={()=>{
                setPropertyType(Property.Rate);
                dispatch(sortingProducts([currentSortingType, currentPropertyType]));
              }}
            >
              <input type="radio" id="sortPopular" name="sort" />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div
              className="catalog-sort__btn catalog-sort__btn--up"
              onClick={()=>{
                setSortingType(Sorting.Up);
                dispatch(sortingProducts([currentSortingType, currentPropertyType]));
              }}
            >
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"/>
                </svg>
              </label>
            </div>
            <div
              className="catalog-sort__btn catalog-sort__btn--down"
              onClick={()=>{
                setSortingType(Sorting.Down);
                dispatch(sortingProducts([currentSortingType, currentPropertyType]));
              }}
            >
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"/>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
