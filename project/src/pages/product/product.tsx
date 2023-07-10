import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import UpBtn from '../../components/up-btn/up-btn';
import ProductDescription from '../../components/product-description/product-description';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchReviewsAction} from '../../store/api-actions';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchProductAction} from '../../store/api-actions';
import {fetchSimilarProductsAction} from '../../store/api-actions';
import ReviewForm from '../../components/review-form/review-form';
import ReviewSuccess from '../../components/review-success/review-success';
import CatalogAddItem from '../../components/catalog-add-item/catalog-add-item';
import {
  getProduct,
  getProductDataLoadingStatus, getProductError,
  getReviews,
  getSimilarProducts
} from '../../store/product-data/selectors';
import {resetProductData} from '../../store/product-data/product-data';
import {Helmet} from 'react-helmet-async';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorScreen from '../error-screen/error-screen';


function Product(): JSX.Element {
  const product = useAppSelector(getProduct);
  const productError = useAppSelector(getProductError);
  const similarProducts = useAppSelector(getSimilarProducts);
  const reviews = useAppSelector(getReviews);
  const dispatch = useAppDispatch();
  const params = useParams<{id: string}>();
  const [reviewPopupState, setReviewPopupState] = useState(false);
  const [reviewSuccessPopupState, setReviewSuccessPopupState] = useState(false);
  const [addItemPopupState, setAddItemPopupState] = useState(false);
  const isProductDataLoaded = useAppSelector(getProductDataLoadingStatus);


  useEffect(() => {
    if (params.id && !product) {
      dispatch(fetchProductAction(Number(params.id)));
      dispatch(fetchReviewsAction(Number(params.id)));
      dispatch(fetchSimilarProductsAction(Number(params.id)));
      console.log('zzzzzzzzzzzzzzzzzz');
    }
    return () => {
      dispatch(resetProductData());
      console.log('zzz');
    };
  }, [params.id]);


  if (isProductDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  if (productError) {
    return (
      <ErrorScreen />
    );
  }

  return (
    <>
      <main>
        <Helmet>
          <title>Продукт - Фотошоп</title>
        </Helmet>
        <div className="page-content">
          <Breadcrumbs name={product ? product.name : null} />
          <ProductDescription product={product} setAddItemPopupState={setAddItemPopupState}/>
          {similarProducts && <ProductSimilar similarProducts={similarProducts} setAddItemPopupState={setAddItemPopupState}/>}
          {reviews && <ReviewBlock reviews={reviews} setReviewPopupState={setReviewPopupState}/>}
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
