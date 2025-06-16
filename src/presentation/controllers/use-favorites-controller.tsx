import { useAppState } from '../../infrastructure/store/appState';

export const useFavoritesController = () => {
  const { favorites, toggleFavorite, isFavorite } = useAppState();

  return { favorites, toggleFavorite, isFavorite };
};
