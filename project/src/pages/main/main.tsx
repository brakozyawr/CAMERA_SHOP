import {useAppSelector} from '../../hooks';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import {AppRoute} from '../../const';
import { Navigate } from 'react-router-dom';
import {getPromo} from '../../store/catalog-data/selectors';


function Main(): JSX.Element {
  const promo = useAppSelector(getPromo);

  return (
    <main>
      <Banner promo={promo}/>
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <Navigate to={AppRoute.Catalog} replace />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Main;
