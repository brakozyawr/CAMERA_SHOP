
export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  Product = '/catalog/product/',
  Basket = 'basket'
}

export enum APIRoute {
  Products = '/cameras',
  Product = '/cameras/',
  Similar = '/similar',
  Reviews = '/reviews',
  Promo = '/promo',
}

export enum NameSpace {
  Catalog = 'CATALOG',
  Product = 'PRODUCT',
  Basket = 'BASKET',
}

export enum Sorting {
  Up = 'up',
  Down = 'down',
  Default = 'default',
}

export enum Property {
  Rating = 'rating',
  Price = 'price',
  Default = 'default',
}
