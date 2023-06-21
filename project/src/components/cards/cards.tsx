import Card from '../card/card';
import {TProduct} from '../../types/types';

type CardsProps = {
  products:TProduct[];
  setAddItemPopupState: (addItemPopupState: boolean) => void;
}

function Cards({products, setAddItemPopupState}: CardsProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product: TProduct) =>
        (
          <Card
            key={product.id}
            product={product}
            setAddItemPopupState={setAddItemPopupState}
          />
        ))}
    </div>
  );
}

export default Cards;
