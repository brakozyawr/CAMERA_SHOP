import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const';

function NotFound(): JSX.Element {
  return (
    <main>
      <Helmet>
        <title>Страница не найдена - Фотошоп</title>
      </Helmet>
      <div className="page-content">
        <h1 className="title title--h1">404. Страница не найдена</h1>
        <Link className="btn btn--purple " to={AppRoute.Catalog}>Вернуться на главную</Link>
      </div>
    </main>

  );
}

export default NotFound;
