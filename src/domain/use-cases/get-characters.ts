import type {Character} from "../entities/character";
import type {CharacterRepository} from "../repositories/character-repository";

export class GetCharacters {
  characterRepo: CharacterRepository;

  constructor(characterRepo: CharacterRepository) {
    this.characterRepo = characterRepo;
  }

  async execute(filters: Record<string, string>): Promise<Character[]> {
    return this.characterRepo.getCharacters(filters);
  }
}
