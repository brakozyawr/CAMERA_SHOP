import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import UpBtn from '../../components/up-btn/up-btn';
import ProductDescription from '../../components/product-description/product-description';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';
//import ReviewForm from '../../components/review-form/review-form';
//import ReviewSuccess from '../../components/review-success/review-success';


function Product(): JSX.Element {
  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <ProductDescription />
          <ProductSimilar />
          <ReviewBlock />
        </div>
      </main>
      <UpBtn />
        {/* <ReviewForm />
      <ReviewSuccess />*/}
    </>
  );
}

export default Product;
