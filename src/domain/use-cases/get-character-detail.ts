import { Character } from '../entities/character';
import { CharacterRepository } from '../repositories/character-repository';
import { UseCase } from './use-case';

export class GetCharacterDetail implements UseCase<string, Character> {
  constructor(private characterRepo: CharacterRepository) {}

  async execute(id: string): Promise<Character> {
    return this.characterRepo.getCharacterById(id);
  }
}
