import { Character } from './character';

export type SortOrder = 'asc' | 'desc';

export type Filters = {
  search: string;
  status: string;
  gender: string;
  character: string;
  species: string;
};

export type AppState = {
  filters: Filters;
  characters: Character[];
  setFilter: (key: keyof Filters, value: string) => void;
  setCharacters: (characters: Character[]) => void;
  resetFilters: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  selectedCharacterId?: string;
  setSelectedCharacterId: (id: string) => void;
  comments: Record<string, string[]>;
  addComment: (id: string, comment: string) => void;
  deletedCharacterIds: string[];
  softDeleteCharacter: (id: string) => void;
  restoreCharacter: (id: string) => void;
};
