import {useEffect, useState} from "react";
import {ToggleFavorite} from "../../domain/use-cases/toggle-favorite";

export const useFavoritesController = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const useCase = new ToggleFavorite();
    setFavorites(useCase.getFavorites());
  }, []);

  const toggleFavorite = (id: string) => {
    const useCase = new ToggleFavorite();
    const updated = useCase.toggle(id);
    setFavorites(updated);
  };

  const isFavorite = (id: string) => {
    const useCase = new ToggleFavorite();
    return useCase.isFavorite(id);
  };

  return {favorites, toggleFavorite, isFavorite};
};
