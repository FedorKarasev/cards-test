import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/redux';
import { useEffect } from 'react';

export const CardInfo = () => {
  const { id } = useParams<{ id: string }>();

  const cardsAmount = useAppSelector((state) => state.cards.cards.length);
  const navigate = useNavigate();
  const card = useAppSelector((state) => state.cards).cards.find((card) => card.id === Number(id));

  useEffect(() => {
    if (Number(id) > cardsAmount) return navigate('/');
  }, []);

  return (
    <div className='relative max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center px-4'>
      <img className='rounded-lg' src={card?.url} alt='' />
      <div className='p-5'>
        <h5 className='m-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{card?.title}</h5>
        <p className='m-3 font-normal text-gray-700 dark:text-gray-400'>{card?.title}</p>
      </div>
    </div>
  );
};
