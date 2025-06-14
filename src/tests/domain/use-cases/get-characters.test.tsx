import { Character } from '../../../domain/entities/character';
import { GetCharacters } from '../../../domain/use-cases/get-characters';
import { vi } from 'vitest';

const mockRepo = {
  getCharacters: vi.fn(async () => [
    { id: '1', name: 'Rick Sanchez', species: 'Human' } as Character,
  ]),
  getCharacterById: vi.fn(
    async (id: string) => ({ id, name: 'Rick Sanchez', species: 'Human' }) as Character,
  ),
};

describe('GetCharacters use case', () => {
  it('returns a list of characters from the repository', async () => {
    const useCase = new GetCharacters(mockRepo);
    const result = await useCase.execute({});
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rick Sanchez');
    expect(mockRepo.getCharacters).toHaveBeenCalledTimes(1);
  });
});
