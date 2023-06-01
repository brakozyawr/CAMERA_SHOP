import CatalogSort from '../catalog-sort/catalog-sort';
import Cards from '../cards/cards';
import Pagination from '../pagination/pagination';
import {TProduct} from '../../types/types';

type CatalogContentProps = {
  products: TProduct[];
}

function CatalogContent({products}: CatalogContentProps): JSX.Element {
  return (
    <div className="catalog__content">
      <CatalogSort />
      <Cards products={products} />
      <Pagination />
    </div>
  );
}

export default CatalogContent;
