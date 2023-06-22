import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import UpBtn from '../../components/up-btn/up-btn';
import ProductDescription from '../../components/product-description/product-description';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchReviewsAction} from '../../store/api-actions';
import {useEffect, useState} from 'react';
import {loadProduct, loadReviews} from '../../store/action';
import {useParams} from 'react-router-dom';
import {fetchProductAction} from '../../store/api-actions';
import {fetchSimilarProductsAction} from '../../store/api-actions';
import ReviewForm from '../../components/review-form/review-form';
import ReviewSuccess from '../../components/review-success/review-success';
import CatalogAddItem from '../../components/catalog-add-item/catalog-add-item';


function Product(): JSX.Element {
  const {product, similarProducts, reviews} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams<{id: string}>();
  const [reviewPopupState, setReviewPopupState] = useState(false);
  const [reviewSuccessPopupState, setReviewSuccessPopupState] = useState(false);
  const [addItemPopupState, setAddItemPopupState] = useState(false);

  useEffect(() => {
    if (Number(params.id)) {
      dispatch(fetchProductAction(Number(params.id)));
      dispatch(fetchReviewsAction(Number(params.id)));
      dispatch(fetchSimilarProductsAction(Number(params.id)));
    }
    return () => {
      dispatch(loadProduct(null));
      dispatch(loadReviews([]));
    };
  }, [Number(params.id)]);

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs name={product ? product.name : null} />
          <ProductDescription product={product} setAddItemPopupState={setAddItemPopupState}/>
          <ProductSimilar similarProducts={similarProducts} setAddItemPopupState={setAddItemPopupState} />
          <ReviewBlock reviews={reviews} setReviewPopupState={setReviewPopupState} />
        </div>
      </main>
      <UpBtn />
      {addItemPopupState && <CatalogAddItem setAddItemPopupState={setAddItemPopupState} />}
      {reviewPopupState && <ReviewForm productId={product ? product.id : null} setReviewPopupState={setReviewPopupState} setReviewSuccessPopupState={setReviewSuccessPopupState}/>}
      {reviewSuccessPopupState && <ReviewSuccess setReviewSuccessPopupState={setReviewSuccessPopupState} />}
    </>
  );
}

export default Product;
