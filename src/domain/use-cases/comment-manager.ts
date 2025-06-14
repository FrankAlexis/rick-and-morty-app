export class CommentManager {
  private key = "character-comments";

  getComments(characterId: string): string[] {
    const data = localStorage.getItem(this.key);
    const parsed = data ? JSON.parse(data) : {};
    return parsed[characterId] || [];
  }

  addComment(characterId: string, comment: string): string[] {
    const data = localStorage.getItem(this.key);
    const parsed = data ? JSON.parse(data) : {};
    parsed[characterId] = [...(parsed[characterId] || []), comment];
    localStorage.setItem(this.key, JSON.stringify(parsed));
    return parsed[characterId];
  }
}
