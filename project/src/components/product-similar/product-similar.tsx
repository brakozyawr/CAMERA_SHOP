import ProductSimilarSliderCard from '../product-similar-slider-card/product-similar-slider-card';
import {TProduct} from '../../types/types';


type ProductSimilarProps = {
  similarProducts: TProduct[];
}

function ProductSimilar({similarProducts}: ProductSimilarProps): JSX.Element {

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarProducts.map((similarProduct: TProduct) =>
                (
                  <ProductSimilarSliderCard
                    key={similarProduct.id}
                    similarProduct={similarProduct}
                  />
                ))}
            </div>
            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSimilar;
