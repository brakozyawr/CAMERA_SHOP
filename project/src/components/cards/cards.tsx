import Card from '../card/card';
import {TProduct} from '../../types/types';

type CardsProps = {
  products:TProduct[];
}

function Cards({products}: CardsProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product: TProduct) =>
        (
          <Card
            //onMouseOverHandler={onMouseOverHandler}
            key={product.id}
            product={product}
          />
        ))}
    </div>
  );
}

export default Cards;
