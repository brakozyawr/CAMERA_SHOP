import Catalog from '../../pages/catalog/catalog';
import Product from '../../pages/product/product';
import Basket from '../../pages/basket/basket';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../layout/layout';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Main from '../../pages/main/main';


function App(): JSX.Element {
  const {isDataLoaded} = useAppSelector((state) => state);

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route path={AppRoute.Main} element={<Main />} />
          <Route index path={AppRoute.Catalog} element={<Catalog />} />
          <Route path={`${AppRoute.Catalog}:id`} element={<Catalog />} />
          <Route path={`${AppRoute.Product}:id`} element={<Product />} />
          <Route path={AppRoute.Basket} element={<Basket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
