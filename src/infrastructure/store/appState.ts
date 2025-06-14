import { create } from 'zustand';
import { Character } from '../../domain/entities/character';

type Filters = {
  search: string;
  status: string;
  gender: string;
  character: string;
  species: string;
};

type AppState = {
  filters: Filters;
  characters: Character[];
  setFilter: (key: keyof Filters, value: string) => void;
  setCharacters: (characters: Character[]) => void;
  resetFilters: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const defaultFilters: Readonly<Filters> = {
  search: '',
  status: '',
  species: '',
  gender: '',
  character: 'All',
};

export const useAppState = create<AppState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorite-characters') || '[]'),
  characters: [],
  filters: defaultFilters,
  setCharacters: (characters) => {
    set({ characters });
  },
  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },
  resetFilters: () => {
    set({
      filters: defaultFilters,
    });
  },
  toggleFavorite: (id) => {
    const current = get().favorites;
    const updated = current.includes(id) ? current.filter((f) => f !== id) : [...current, id];

    localStorage.setItem('favorite-characters', JSON.stringify(updated));
    set({ favorites: updated });
  },
  isFavorite: (id) => {
    return get().favorites.includes(id);
  },
}));
