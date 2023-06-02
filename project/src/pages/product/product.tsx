import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import UpBtn from '../../components/up-btn/up-btn';
import ProductDescription from '../../components/product-description/product-description';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';
import {useAppSelector} from '../../hooks';
//import ReviewForm from '../../components/review-form/review-form';
//import ReviewSuccess from '../../components/review-success/review-success';


function Product(): JSX.Element {
  const {product, similarProducts, reviews} = useAppSelector((state) => state);

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <ProductDescription product={product} />
          <ProductSimilar similarProducts={similarProducts} />
          <ReviewBlock reviews={reviews} />
        </div>
      </main>
      <UpBtn />
      {/* <ReviewForm />
      <ReviewSuccess />*/}
    </>
  );
}

export default Product;
