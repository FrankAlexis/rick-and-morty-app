import {create} from "zustand";

type Filters = {
  search: string;
  status: string;
  gender: string;
  character: string;
  species: string;
};

type AppState = {
  filters: Filters;
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useAppState = create<AppState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem("favorite-characters") || "[]"),
  filters: {
    search: "",
    status: "",
    species: "",
    gender: "",
    character: "",
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
      filters: {
        search: "",
        status: "",
        species: "",
        gender: "",
        character: "",
      },
    });
  },
  toggleFavorite: (id) => {
    const current = get().favorites;
    const updated = current.includes(id)
      ? current.filter((f) => f !== id)
      : [...current, id];

    localStorage.setItem("favorite-characters", JSON.stringify(updated));
    set({favorites: updated});
  },

  isFavorite: (id) => {
    return get().favorites.includes(id);
  },
}));
