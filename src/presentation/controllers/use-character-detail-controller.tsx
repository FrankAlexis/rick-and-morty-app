import { useEffect, useState } from 'react';
import { CharacterRepositoryImpl } from '../../infrastructure/repositories/character-repository-impl';
import { useAppState } from '../../infrastructure/store/appState';
import { useParams } from 'react-router-dom';
import { Character } from '../../domain/entities/character';

export const useCharacterDetailController = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const { selectedCharacterId, deletedCharacterIds, softDeleteCharacter, restoreCharacter } =
    useAppState();
  const isDeleted = deletedCharacterIds.includes(id || selectedCharacterId || '');

  useEffect(() => {
    const characterId = selectedCharacterId || id;
    if (!characterId) return;

    const useCase = new CharacterRepositoryImpl();
    useCase
      .getCharacterById(characterId)
      .then((character) => {
        setSelectedCharacter(character);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setSelectedCharacter, id, selectedCharacterId]);

  return { selectedCharacter, isLoading, softDeleteCharacter, restoreCharacter, isDeleted };
};
