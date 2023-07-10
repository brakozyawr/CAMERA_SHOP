import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const';

function NotFound(): JSX.Element {
  return (
    <main style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
      <Helmet>
        <title>Страница не найдена - Фотошоп</title>
      </Helmet>
      <div className="page-content" style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <h1 className="title title--h1">404. Страница не найдена</h1>
        <Link className="btn btn--purple " to={`${AppRoute.Catalog}1`}>Вернуться на главную</Link>
      </div>
    </main>

  );
}

export default NotFound;
