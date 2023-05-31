import Header from '../header/header';
import Footer from '../footer/footer';
//import Catalog from '../../pages/catalog/catalog';
//import Product from '../../pages/product/product';
import Basket from '../../pages/basket/basket';

function App(): JSX.Element {
  return (
    <>
      <Header />
      {/*<Catalog />*/}
      {/*<Product />*/}
      <Basket />
      <Footer />
    </>

  );
}

export default App;
