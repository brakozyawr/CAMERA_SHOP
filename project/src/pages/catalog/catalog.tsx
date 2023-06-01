import {/*useAppDispatch,*/ useAppSelector} from '../../hooks';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogAside from '../../components/catalog-aside/catalog-aside';
import CatalogContent from '../../components/catalog-content/catalog-content';
//import CatalogAddItem from '../../components/catalog-add-item/catalog-add-item';
//import CatalogAddItemSuccess from '../../components/catalog-add-item-success/catalog-add-item-success';


function Catalog(): JSX.Element {
  const {products} = useAppSelector((state) => state);
  //console.log(products);

  return (
    <main>
      <Banner/>
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogAside />
              <CatalogContent products={products} />
            </div>
          </div>
        </section>
      </div>
      {/*<CatalogAddItem />
      <CatalogAddItemSuccess />*/}
    </main>
  );
}

export default Catalog;
