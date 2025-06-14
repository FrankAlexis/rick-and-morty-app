import {Character} from "../entities/character";
import {CharacterRepository} from "../repositories/character-repository";

export class GetCharacterDetail {
  constructor(private characterRepo: CharacterRepository) {}

  async execute(id: string): Promise<Character> {
    return this.characterRepo.getCharacterById(id);
  }
}
