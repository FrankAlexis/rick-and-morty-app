import type { Character } from '../entities/character';
import type { CharacterRepository } from '../repositories/character-repository';
import { UseCase } from './use-case';

export class GetCharacters implements UseCase<Record<string, string>, Character[]> {
  characterRepo: CharacterRepository;

  constructor(characterRepo: CharacterRepository) {
    this.characterRepo = characterRepo;
  }

  async execute(filters: Record<string, string>): Promise<Character[]> {
    return this.characterRepo.getCharacters(filters);
  }
}
