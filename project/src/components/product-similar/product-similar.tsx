import ProductSimilarSliderCard from '../product-similar-slider-card/product-similar-slider-card';
import {TProduct} from '../../types/types';
import { Carousel } from '@trendyol-js/react-carousel';
import LeftArrow from '../left-arrow/left-arrow';
import RightArrow from '../right-arrow/right-arrow';


type ProductSimilarProps = {
  similarProducts: TProduct[];
}

function ProductSimilar({similarProducts}: ProductSimilarProps): JSX.Element {
  const items = similarProducts.map((similarProduct: TProduct) => (
    <ProductSimilarSliderCard
      key={similarProduct.id}
      similarProduct={similarProduct}
    />
  ));
  //console.log(items);

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            {items.length &&
              <Carousel
                show={3}
                slide={2}
                transition={0.5}
                infinite={false}
                dynamic
                swiping
                className="product-similar__slider-list"
                rightArrow={<RightArrow/>}
                leftArrow={<LeftArrow/>}
              >
                {items}
              </Carousel>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSimilar;
