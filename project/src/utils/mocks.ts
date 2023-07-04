import {commerce, datatype, system, date, random} from 'faker';
import {TProduct, TPromo, TReview, TReviewAdd} from '../types/types';

/*export const makeFakeProducts = (): TProduct => ({
  id: datatype.number();
  name: commerce.product();
  vendorCode: datatype.uuid();
  type: commerce.productName();
  category: commerce.department();
  description: commerce.productDescription();
  level: commerce.productAdjective();
  price: Number(commerce.price);
  reviewCount: datatype.number({ min: 1, max: 5});
  previewImg: system.filePath();
  previewImg2x: system.filePath();
  previewImgWebp: system.filePath();
  previewImgWebp2x: system.filePath();
} as TProduct);*/

export const makeFakeProduct: TProduct = {
  id: datatype.number(),
  name: commerce.product(),
  vendorCode: datatype.uuid(),
  type: commerce.productName(),
  category: commerce.department(),
  description: commerce.productDescription(),
  level: commerce.productAdjective(),
  price: datatype.number(),
  reviewCount: datatype.number({ min: 1, max: 5}),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
};

/*export const makeFakeProducts = Array(5).fill({
  id: datatype.number(),
  name: commerce.product(),
  vendorCode: datatype.uuid(),
  type: commerce.productName(),
  category: commerce.department(),
  description: commerce.productDescription(),
  level: commerce.productAdjective(),
  price: datatype.number(),
  reviewCount: datatype.number({ min: 1, max: 5}),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
}as TProduct);*/

export const makeFakeProducts = Array(5).fill(makeFakeProduct) as TProduct[];

export const makeFakePromo: TPromo = {
  id: datatype.number(),
  name: commerce.product(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
};

export const makeFakeReview: TReview = {
  id: datatype.uuid(),
  createAt: String(date.recent()),
  cameraId: datatype.number(),
  userName: random.word(),
  advantage: commerce.productAdjective(),
  disadvantage: commerce.productAdjective(),
  review: commerce.productAdjective(),
  rating: datatype.number({ min: 1, max: 5}),
};

export const makeFakeReviews = Array(5).fill(makeFakeReview)as TReview[];


export const makeFakeReviewAdd: TReviewAdd = {
  cameraId: datatype.number(),
  userName: random.word(),
  advantage: commerce.productAdjective(),
  disadvantage: commerce.productAdjective(),
  review: commerce.productAdjective(),
  rating: datatype.number({ min: 1, max: 5}),
};


