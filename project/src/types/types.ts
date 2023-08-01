import {store} from '../store';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TProduct = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  price: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  rating: number;
}

export type TPromo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type TReview = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type TReviewAdd = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type TCatalogData = {
  products: TProduct[];
  //allProductsRatingList: Map<number, number>;
  promo: TPromo | null;
  isCatalogDataLoaded: boolean;
  productsError: boolean;
};

export type TProductData = {
  product: TProduct | null;
  similarProducts: TProduct[];
  reviews: TReview[];
  isProductDataLoaded: boolean;
  productError: boolean;
};

export type TBasketData = {
  basketList: number[];
  candidateForBasketList: number;
};

