import {name, commerce, datatype, system, date, random} from 'faker';
import {TProduct, TPromo, TReview, TReviewAdd} from '../types/types';

export const makeFakeProduct = (): TProduct => ({
  id: datatype.number({ min: 1, max: 50}),
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
} );

export const makeFakeProducts = (): TProduct[] => Array(5).fill({}).map(()=> makeFakeProduct());

export const makeFakePromo = (): TPromo => ({
  id: datatype.number(),
  name: commerce.product(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
});

export const makeFakeReview = (): TReview => ({
  id: datatype.uuid(),
  createAt: String(date.recent()),
  cameraId: datatype.number(),
  userName: name.title(),
  advantage: commerce.productAdjective(),
  disadvantage: commerce.productAdjective(),
  review: commerce.productAdjective(),
  rating: datatype.number({ min: 1, max: 5}),
});

export const makeFakeReviews = (): TReview[] => Array(5).fill({}).map(()=>makeFakeReview());

export const makeFakeReviewAdd = ():TReviewAdd => ({
  cameraId: datatype.number(),
  userName: name.title(),
  advantage: random.word(),
  disadvantage: commerce.productAdjective(),
  review: commerce.productMaterial(),
  rating: datatype.number({ min: 1, max: 5}),
});
