import {TProduct} from './types/types';
import {Property, Sorting} from './const';


export const sortProducts = function(products: TProduct[], currentSorting: string, property: keyof TProduct | Property.Default ): TProduct[] {
  const sortedProducts = products.slice();
  console.log({...products});
  console.log(currentSorting);
  console.log(property);

  if(property !== Property.Default){
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
        break;
      case Sorting.Default:
        return sortedProducts;
    }
  }

  return sortedProducts;
};
