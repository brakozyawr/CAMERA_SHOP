import {useAppSelector} from '../../hooks';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogAside from '../../components/catalog-aside/catalog-aside';
import CatalogContent from '../../components/catalog-content/catalog-content';
import CatalogAddItem from '../../components/catalog-add-item/catalog-add-item';
import {useEffect, useState} from 'react';
import {TProduct} from '../../types/types';
import {useParams} from 'react-router-dom';
import {getCurrentProductList, getProducts, getProductsError, getPromo} from '../../store/catalog-data/selectors';
import {Helmet} from 'react-helmet-async';
import NotFound from '../not-found/not-found';
import ErrorScreen from '../error-screen/error-screen';


function Catalog(): JSX.Element {
  const products = useAppSelector(getProducts);
  const currentProductList = useAppSelector(getCurrentProductList);
  const currentProducts = currentProductList.length ? currentProductList : products;
  const promo = useAppSelector(getPromo);
  const productsError = useAppSelector(getProductsError);

  const [addItemPopupState, setAddItemPopupState] = useState(false);

  const step = 9;
  const INITIAL_PAGE_NUMBER = 1;
  const [currentPageNumber, setPage] = useState(INITIAL_PAGE_NUMBER);
  const getPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const params = useParams<{id: string}>();

  useEffect(() => {
    if (params.id) {
      setPage(Number(params.id));
    }
  }, [params.id]);


  const cutProducts: TProduct[] = currentProducts.slice((currentPageNumber - 1) * step, currentPageNumber * step);
  const pageCount: number = Math.ceil(currentProducts.length / step);

  if ((isNaN(Number(params.id)) && params.id !== undefined) || Number(params.id) > pageCount ) {
    return (
      <NotFound />
    );
  }

  if (productsError) {
    return (
      <ErrorScreen />
    );
  }

  return (
    <main>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <Banner promo={promo}/>
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogAside />
              <CatalogContent
                products={cutProducts}
                pageCount={pageCount}
                currentPageNumber={currentPageNumber}
                getPage={getPage}
                setAddItemPopupState={setAddItemPopupState}
              />
            </div>
          </div>
        </section>
      </div>
      {addItemPopupState && <CatalogAddItem setAddItemPopupState={setAddItemPopupState} />}
    </main>
  );
}

export default Catalog;
