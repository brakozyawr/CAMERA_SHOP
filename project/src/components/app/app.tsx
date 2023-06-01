import Catalog from '../../pages/catalog/catalog';
import Product from '../../pages/product/product';
import Basket from '../../pages/basket/basket';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../layout/layout';
import {AppRoute} from '../../const';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Catalog} element={<Layout />}>
          <Route index element={<Catalog />} />
          <Route path={`${AppRoute.Catalog}:id`} element={<Product />} />
          <Route path={AppRoute.Basket} element={<Basket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
