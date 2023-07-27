
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
  /*PriceUp = 'Price: low to high',
  PriceDown = 'Price: high to low',
  RatedUp = 'Top rated first',
  RateDown = 'Top rated first',*/
  Default = 'Top rated first',
}

export enum Property {
  Rate = 'rate',
  Price = 'price',
  /*PriceUp = 'Price: low to high',
  PriceDown = 'Price: high to low',
  RatedUp = 'Top rated first',
  RateDown = 'Top rated first',
  Default = 'Top rated first',*/
}
