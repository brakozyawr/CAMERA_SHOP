import {HelmetProvider} from 'react-helmet-async';
import Catalog from '../../pages/catalog/catalog';
import Product from '../../pages/product/product';
import Basket from '../../pages/basket/basket';
import {Routes, Route} from 'react-router-dom';
import Layout from '../layout/layout';
import {AppRoute} from '../../const';
//import {useAppSelector} from '../../hooks';
//import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
//import {getCatalogDataLoadingStatus} from '../../store/catalog-data/selectors';
//import {getProductDataLoadingStatus} from '../../store/product-data/selectors';


function App(): JSX.Element {
  //const isProductDataLoaded = useAppSelector(getProductDataLoadingStatus);
  //const isCatalogDataLoaded = useAppSelector(getCatalogDataLoadingStatus);
  //console.log(isProductDataLoaded);
  //console.log(isCatalogDataLoaded);
  /*if (isProductDataLoaded || isCatalogDataLoaded) {
    return (
      <LoadingScreen />
    );
  }*/

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route path={AppRoute.Main} element={<Main />} />
          <Route index path={AppRoute.Catalog} element={<Catalog />} />
          <Route path={`${AppRoute.Catalog}:id`} element={<Catalog />} />
          <Route path={`${AppRoute.Product}:id`} element={<Product />} />
          <Route path={AppRoute.Basket} element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
