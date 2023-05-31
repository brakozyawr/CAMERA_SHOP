import Card from '../card/card';

/*type CardsProps = {
  cards:TCard[];
}*/

function Cards(/*{cards}: CardsProps*/): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {/* {cards.map((card: TCard) =>
        (
          <Card
            //onMouseOverHandler={onMouseOverHandler}
            key={card.id}
            card={card}
          />
        ))}*/}
      <Card />
    </div>
  );
}

export default Cards;
