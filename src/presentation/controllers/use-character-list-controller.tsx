import { useEffect, useState } from 'react';
import { CharacterRepositoryImpl } from '../../infrastructure/repositories/character-repository-impl';
import { GetCharacters } from '../../domain/use-cases/get-characters';
import { useAppState } from '../../infrastructure/store/appState';

export const useCharacterListController = () => {
  const {
    filters,
    isFavorite,
    characters,
    setCharacters,
    sortOrder,
    setSelectedCharacterId,
    selectedCharacterId,
  } = useAppState();
  const [isLoading, setIsLoading] = useState(true);
  const deletedIds = useAppState((s) => s.deletedCharacterIds);
  const filteredCharacters = characters.filter((c) => !deletedIds.includes(c.id));

  const starred = (
    filters.character === 'Starred' || filters.character === 'All'
      ? filteredCharacters.filter((c) => isFavorite(c.id))
      : []
  ).sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return sortOrder === 'asc' ? result : -result;
  });

  const others = (
    filters.character === 'Others' || filters.character === 'All'
      ? filteredCharacters.filter((c) => !isFavorite(c.id))
      : []
  ).sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return sortOrder === 'asc' ? result : -result;
  });

  const amountOfFilters = Object.values(filters).filter((value) => value && value !== 'All').length;
  const total = others.length + starred.length;

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
      .then(setCharacters)
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters, setCharacters]);

  return {
    characters,
    starred,
    others,
    setSelectedCharacterId,
    selectedCharacterId,
    amountOfFilters,
    total,
    isLoading,
  };
};
