import {TProduct} from './types/types';
import {Sorting} from './const';

/*type TProperty = TProduct['rate' | 'price']*/

export const sortProducts = function(products: TProduct[], currentSorting: string, property: keyof TProduct ): TProduct[] {
  const sortedProducts = products.slice();

  switch (currentSorting) {
    case Sorting.Up:
      sortedProducts.sort((a, b) => {
        const productA = {...a};
        const productB = {...b};
        return Number(productA[property]) - Number(productB[property]);
      });
      break;
    case Sorting.Down:
      sortedProducts.sort((a, b) => Number(b[property]) - Number(a[property]));
      console.log(Sorting.Down);
      break;
    case Sorting.Default:
      return sortedProducts;
  }

  return sortedProducts;
};
