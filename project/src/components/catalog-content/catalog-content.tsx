import CatalogSort from '../catalog-sort/catalog-sort';
import Cards from '../cards/cards';
import Pagination from '../pagination/pagination';


function CatalogContent(): JSX.Element {
  return (
    <div className="catalog__content">
      <CatalogSort />
      <Cards />
      <Pagination />
    </div>
  );
}

export default CatalogContent;
