import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type PaginationProps = {
  pageCount: number;
  currentPageNumber: number;
  getPage: (pageNumber: number) => void;
}

const getPaginationList = (pageCount: number, currentPageNumber: number, getPage:(pageNumber: number) => void) => {
  const content = [];
  for (let i = 1; i <= pageCount; i++) {
    content.push(
      <li
        key={i}
        className="pagination__item"
        data-pagination-item={i}
        onClick={() => {
          getPage(i);
        }}
      >
        <Link
          className={`${currentPageNumber === i ? 'pagination__link--active' : '' } pagination__link`}
          to={`${AppRoute.Catalog}${String(i)}`}
        >{i}
        </Link>
      </li>
    );
  }
  return content;
};

function Pagination({pageCount, currentPageNumber, getPage}: PaginationProps): JSX.Element {

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPageNumber > 1 && (
          <li
            className="pagination__item"
            onClick={() => {
              getPage(currentPageNumber - 1);
            }}
          >
            <Link className="pagination__link pagination__link--text" to={`${AppRoute.Catalog}${String(currentPageNumber - 1)}`}>Назад</Link>
          </li>
        )}
        {getPaginationList(pageCount, currentPageNumber, getPage )}
        {currentPageNumber < pageCount && (
          <li
            className="pagination__item"
            onClick={() => {
              getPage(currentPageNumber + 1);
            }}
          >
            <Link className="pagination__link pagination__link--text" to={`${AppRoute.Catalog}${String(currentPageNumber + 1)}`}>Далее</Link>
          </li>)}
      </ul>
    </div>
  );
}

export default Pagination;
