export const STORAGE_KEYS = {
  COMMENTS_KEY: 'rick-comments',
  FAVORITE_CHARACTERS_KEY: 'favorite-characters',
  DELETED_CHARACTERS_KEY: 'deleted-characters',
} as const;

export const saveInStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = <T>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
