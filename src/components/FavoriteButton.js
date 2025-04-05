'use client';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function FavoriteButton({ type, id }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites[type]);
  const isFavorite = favorites.includes(id);

  return (
    <button
      onClick={() => dispatch(toggleFavorite({ type, id }))}
      className={`text-2xl transition-transform duration-200 ${isFavorite ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-400'}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}