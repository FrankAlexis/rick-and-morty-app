import type {Character} from "../entities/character";

export interface CharacterRepository {
  getCharacters(filters: Record<string, string>): Promise<Character[]>;
  getCharacterById(id: string): Promise<Character>;
}
