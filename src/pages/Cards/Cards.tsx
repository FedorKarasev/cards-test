import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { useEffect, useState } from 'react';
import { fetchCards } from '../../app/stores/reducers/cardListSlice';
import { ICard } from '../../app/interfaces/ICard';
import { Card } from '../../components/Card/Card';
import './cards.css';

export const Cards = () => {
  const dispatch = useAppDispatch();
  let cards = useAppSelector((state) => state.cards);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (!cards.cards.length) dispatch(fetchCards(15));
  }, []);

  function filterHandler() {
    setIsFiltered(!isFiltered);
  }

  return (
    <div className='flex flex-col gap-2 items-end'>
      <button onClick={filterHandler} className={`filterBtn ${isFiltered ? 'active' : ''}`}>
        Show liked only
      </button>
      {cards.isLoading && <div>Loading...</div>}
      {cards.error && !cards.isLoading ? <div>Error: {cards.error}</div> : ''}
      {!cards.isLoading && cards.cards.length ? (
        cards.cards
          .filter((card) => {
            if (isFiltered) {
              if (card.like) return card;
            } else {
              return card;
            }
          })
          .map((card: ICard) => <Card card={card} key={card.id} />)
      ) : (
        <div>Cards not found</div>
      )}
    </div>
  );
};
