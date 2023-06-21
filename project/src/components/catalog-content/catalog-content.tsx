import CatalogSort from '../catalog-sort/catalog-sort';
import Cards from '../cards/cards';
import Pagination from '../pagination/pagination';
import {TProduct} from '../../types/types';

type CatalogContentProps = {
  products: TProduct[];
  pageCount: number;
  currentPageNumber: number;
  getPage: (pageNumber: number) => void;
  setAddItemPopupState: (addItemPopupState: boolean) => void;
}

function CatalogContent({products, pageCount, currentPageNumber, getPage, setAddItemPopupState}: CatalogContentProps): JSX.Element {
  return (
    <div className="catalog__content">
      <CatalogSort />
      <Cards products={products} setAddItemPopupState={setAddItemPopupState} />
      <Pagination pageCount={pageCount} currentPageNumber={currentPageNumber} getPage={getPage} />
    </div>
  );
}

export default CatalogContent;
