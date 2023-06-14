import {Link, useLocation} from 'react-router-dom';
/*import {AppRoute} from '../../const';
import cn from 'classnames';*/
import useBreadcrumbs from 'use-react-router-breadcrumbs';


type BreadcrumbsropsProps = {
  name?: string | null;
}

type TRoute = {
  path: string;
  breadcrumb: string;
};


function Breadcrumbs({name}:BreadcrumbsropsProps): JSX.Element {
  const routes: TRoute[] = [
    { path: '/', breadcrumb: 'Главная' },
    { path: '/catalog', breadcrumb: 'Каталог' },
    { path: '/catalog/product/:id', breadcrumb: name ? name : '' },
  ];
  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });
  const location = useLocation();

  /*return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog} >
              Главная
              <svg width="5" height="8" aria-hidden="true"><use xlinkHref="#icon-arrow-mini"/></svg>
            </Link>
          </li>

          <li className="breadcrumbs__item">
            <Link className={cn('breadcrumbs__link', {'breadcrumbs__link--active': !name})} to={AppRoute.Catalog}>
              Каталог
              {name && <svg width="5" height="8" aria-hidden="true"><use xlinkHref="#icon-arrow-mini" /></svg>}
            </Link>
          </li>

          {name && <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
          </li>}
        </ul>
      </div>
    </div>
  );*/

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <Link
              key={match.pathname}
              to={match.pathname}
              className={ match.pathname === location.pathname ? 'breadcrumbs__link breadcrumbs__link--active' : 'breadcrumbs__link'}
            >{breadcrumb}<svg width="5" height="8" aria-hidden="true"><use xlinkHref="#icon-arrow-mini" /></svg>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
