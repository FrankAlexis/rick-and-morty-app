import { useEffect } from 'react';
import { CharacterRepositoryImpl } from '../../infrastructure/repositories/character-repository-impl';
import { GetCharacters } from '../../domain/use-cases/get-characters';
import { useAppState } from '../../infrastructure/store/appState';

export const useCharacterListController = () => {
  const { filters, isFavorite, characters, setCharacters } = useAppState();

  const starred =
    filters.character === 'Starred' || filters.character === 'All'
      ? characters.filter((c) => isFavorite(c.id))
      : [];

  const others =
    filters.character === 'Others' || filters.character === 'All'
      ? characters.filter((c) => !isFavorite(c.id))
      : [];

  useEffect(() => {
    const repository = new CharacterRepositoryImpl();
    const useCase = new GetCharacters(repository);

    useCase
      .execute({
        name: filters.search,
        status: filters.status,
        species: filters.species,
        gender: filters.gender,
      })
      .then(setCharacters);
  }, [filters, setCharacters]);

  return { characters, starred, others };
};
