import {useAppSelector} from '../../hooks';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogAside from '../../components/catalog-aside/catalog-aside';
import CatalogContent from '../../components/catalog-content/catalog-content';
import CatalogAddItem from '../../components/catalog-add-item/catalog-add-item';
import {useEffect, useState} from 'react';
import {TProduct} from '../../types/types';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {getCurrentProductList, getProducts, getProductsError, getPromo} from '../../store/catalog-data/selectors';
import {Helmet} from 'react-helmet-async';
import NotFound from '../not-found/not-found';
import ErrorScreen from '../error-screen/error-screen';
import {AppRoute} from '../../const';


function Catalog(): JSX.Element {
  const products = useAppSelector(getProducts);
  const currentProductList = useAppSelector(getCurrentProductList);

  const currentProducts = currentProductList.length ? currentProductList : products;
  //console.log(currentProducts);
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

  const cutProducts: TProduct[] = currentProducts.slice((currentPageNumber - 1) * step, currentPageNumber * step);
  const pageCount: number = Math.ceil(currentProducts.length / step);


  /*useEffect(() => {
    cutProducts = currentProducts.slice((currentPageNumber - 1) * step, currentPageNumber * step);
    pageCount = Math.ceil(currentProducts.length / step);
    if (Number(params.id) > pageCount) {
      setPage(1);
      goToBeginning();
    }
  }, [currentProductList]);*/

  useEffect(() => {
    //console.log(params.id);
    //console.log(pageCount);
    if (params.id) {
      setPage(Number(params.id));
    }
  }, [params.id]);


  if ((isNaN(Number(params.id)) && params.id !== undefined)) {
    return (
      <NotFound />
    );
  }

  if (currentProductList && Number(params.id) > pageCount) {
    return (<Navigate to={`${AppRoute.Catalog}1`} replace/>);
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
              <CatalogAside productList={currentProducts}/>
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
