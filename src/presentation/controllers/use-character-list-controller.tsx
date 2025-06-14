import {useState, useEffect} from "react";
import {CharacterRepositoryImpl} from "../../infrastructure/repositories/character-repository-impl";
import {GetCharacters} from "../../domain/use-cases/get-characters";
import type {Character} from "../../domain/entities/character";
import {useAppState} from "../../infrastructure/store/appState";

export const useCharacterListController = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const {filters} = useAppState();

  useEffect(() => {
    const repo = new CharacterRepositoryImpl();
    const useCase = new GetCharacters(repo);

    useCase
      .execute({
        name: filters.search,
        status: filters.status,
        species: filters.species,
        gender: filters.gender,
      })
      .then(setCharacters);
  }, [filters]);

  return {characters};
};
