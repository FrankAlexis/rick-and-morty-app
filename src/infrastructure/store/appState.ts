import { create } from 'zustand';
import { getFromStorage, saveInStorage, STORAGE_KEYS } from './localStorage';
import { AppState, Filters } from '../../domain/entities/app-state';

const defaultFilters: Readonly<Filters> = {
  search: '',
  status: '',
  species: '',
  gender: '',
  character: 'All',
};

export const useAppState = create<AppState>((set, get) => ({
  favorites: getFromStorage<string[]>(STORAGE_KEYS.FAVORITE_CHARACTERS_KEY) || [],
  characters: [],
  filters: defaultFilters,
  sortOrder: 'asc',
  comments: getFromStorage<Record<string, string[]>>(STORAGE_KEYS.COMMENTS_KEY) || {},
  deletedCharacterIds: getFromStorage<string[]>(STORAGE_KEYS.DELETED_CHARACTERS_KEY) || [],
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
    saveInStorage(STORAGE_KEYS.FAVORITE_CHARACTERS_KEY, updated);
    set({ favorites: updated });
  },
  isFavorite: (id) => {
    return get().favorites.includes(id);
  },
  setSortOrder: (order) => set({ sortOrder: order }),
  setSelectedCharacterId: (id) => set({ selectedCharacterId: id }),
  addComment: (id, comment) =>
    set((state) => {
      const updated = {
        ...state.comments,
        [id]: [...(state.comments[id] || []), comment],
      };

      saveInStorage<Record<string, string[]>>(STORAGE_KEYS.COMMENTS_KEY, updated);
      return { comments: updated };
    }),
  softDeleteCharacter: (id) =>
    set((state) => {
      const updated = [...state.deletedCharacterIds, id];
      saveInStorage<string[]>(STORAGE_KEYS.DELETED_CHARACTERS_KEY, updated);
      return { deletedCharacterIds: updated };
    }),
  restoreCharacter: (id) =>
    set((state) => {
      const updated = state.deletedCharacterIds.filter((x) => x !== id);
      saveInStorage<string[]>(STORAGE_KEYS.DELETED_CHARACTERS_KEY, updated);
      return { deletedCharacterIds: updated };
    }),
}));
