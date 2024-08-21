import { useNavigate } from 'react-router-dom';
import { truncate } from '../../app/helpers/strings';
import { ICard } from '../../app/interfaces/ICard';
import './card.css';
import { useAppDispatch } from '../../app/hooks/redux';
import { likeCard, removeCard } from '../../app/stores/reducers/cardListSlice';

export const Card = (props: { card: ICard }) => {
  const title = truncate(props.card.title, 30);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function removeCardHandler() {
    console.log('remove');
    dispatch(removeCard(Number(props.card.id)));
  }

  function likeCardHandler() {
    console.log('like');
    dispatch(likeCard(Number(props.card.id)));
  }

  function redirectHandler(event: any, cardId: number) {
    if (!event.target.closest('button')) {
      navigate(`/cards/${cardId}`);
    }
  }

  return (
    <div
      onClick={(e) => redirectHandler(e, props.card.id)}
      className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center px-4 cursor-pointer'
    >
      <img className='rounded-lg' src={props.card.thumbnailUrl} alt='' />
      <div className='flex flex-col gap-3 justify-between p-5'>
        <div className='info'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h5>

          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{title}</p>
        </div>
        <div className='controlls flex flex-row gap-3 justify-center'>
          <button onClick={likeCardHandler} className='btn bg-teal-800'>
            {props.card.like ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-heart-fill'
                viewBox='0 0 16 16'
              >
                <path fillRule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-heart-fill'
                viewBox='0 0 16 16'
              >
                <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15' />
              </svg>
            )}
          </button>
          <button onClick={removeCardHandler} className='btn bg-red-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-trash3-fill'
              viewBox='0 0 16 16'
            >
              <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
