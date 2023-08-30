import {TProduct, TSelectedFilters} from './types/types';
import {Property, Sorting} from './const';


export const sortProducts = function(products: TProduct[], currentSorting: string, property: keyof TProduct | Property.Default ): TProduct[] {
  const sortedProducts = products.slice();

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

export const getFilteredProducts = (propertyList:TSelectedFilters, products: TProduct[]) => {
  let filteredProductsList: TProduct[] = [];
  let productsList: TProduct[] = [];

  for (const key in propertyList) {
    productsList = filteredProductsList.length ? filteredProductsList : products;
    const parameter = key as keyof TProduct;
    let filteredArr:TProduct[];
    if(propertyList[parameter].length){
      filteredArr = productsList.filter((product) =>
        product[parameter] === propertyList[parameter].find((property:string | number) => product[parameter] === property)
      );
      filteredProductsList = filteredProductsList.length ? filteredArr : filteredProductsList.concat(filteredArr);
    }

  }

  return filteredProductsList;
};
