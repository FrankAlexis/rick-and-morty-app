import {useEffect, useState} from "react";
import {CharacterRepositoryImpl} from "../../infrastructure/repositories/character-repository-impl";
import {Character} from "../../domain/entities/character";

export const useCharacterDetailController = (id: string) => {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const useCase = new CharacterRepositoryImpl();
    useCase.getCharacterById(id).then(setCharacter);
  }, [id]);

  return {character};
};
