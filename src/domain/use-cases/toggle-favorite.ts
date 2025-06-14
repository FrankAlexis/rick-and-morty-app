export class ToggleFavorite {
  private storageKey = "favorite-characters";

  getFavorites(): string[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  }

  toggle(id: string): string[] {
    const current = this.getFavorites();
    const updated = current.includes(id)
      ? current.filter((fav) => fav !== id)
      : [...current, id];
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    return updated;
  }
}
