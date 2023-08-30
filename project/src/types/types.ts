import {store} from '../store';
import {Property} from '../const';

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

export type TSelectedFilters = {[key: string]: string[] | number[]};
/*export type TSelectedFilters = {
  id?: number;
  type?: string;
  category?: string;
  level?: string;
  price?: number;
}*/

export type TCatalogData = {
  products: TProduct[];
  productsWithRating: TProduct[];
  productsWithRatingCount: number;
  currentPriceRangeProductsIdList: number[];
  currentProductList: TProduct[];
  currentFilters: TSelectedFilters;
  currentSortingType: string;
  currentSortingProperty: keyof TProduct | Property.Default;
  promo: TPromo | null;
  isCatalogDataLoaded: boolean;
  productsError: boolean;
  absolyteMinPrice: number;
  absolyteMaxPrice: number;
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





