import {useAppSelector} from '../../hooks';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogAside from '../../components/catalog-aside/catalog-aside';
import CatalogContent from '../../components/catalog-content/catalog-content';
import CatalogAddItem from '../../components/catalog-add-item/catalog-add-item';
//import CatalogAddItemSuccess from '../../components/catalog-add-item-success/catalog-add-item-success';

import {useEffect, useState} from 'react';
import {TProduct} from '../../types/types';
import {useParams} from 'react-router-dom';
import {getProducts, getPromo} from '../../store/catalog-data/selectors';
import {Helmet} from 'react-helmet-async';


function Catalog(): JSX.Element {
  const products = useAppSelector(getProducts);
  const promo = useAppSelector(getPromo);
  const [addItemPopupState, setAddItemPopupState] = useState(false);

  const step = 9;
  const INITIAL_PAGE_NUMBER = 1;

  const [currentPageNumber, setPage] = useState(INITIAL_PAGE_NUMBER);

  const getPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const params = useParams<{id: string}>();

  useEffect(() => {
    if (Number(params.id)) {
      setPage(Number(params.id));
    }
  }, [Number(params.id)]);

  const cutProducts: TProduct[] = products.slice((currentPageNumber - 1) * step, currentPageNumber * step);
  const pageCount: number = Math.ceil(products.length / step);

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
      {/*<CatalogAddItemSuccess />*/}
    </main>
  );
}

export default Catalog;
