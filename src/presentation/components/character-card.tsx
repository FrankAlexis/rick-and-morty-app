import { FC } from 'react';
import type { Character } from '../../domain/entities/character';
import { useAppState } from '../../infrastructure/store/appState';

type Props = {
  character: Character;
};

export const CharacterCard: FC<Props> = ({ character }) => {
  const isFavorite = useAppState((state) => state.isFavorite(character.id));
  const toggleFavorite = useAppState((state) => state.toggleFavorite);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition transform group-hover:scale-105">
      <img src={character.image} alt={character.name} className="h-56 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{character.name}</h3>
        <p className="text-sm text-gray-600">{character.species}</p>
        <p className="text-sm text-gray-500">
          {character.status} - {character.gender}
        </p>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(character.id);
        }}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-xl"
      >
        {isFavorite ? '💚' : '🤍'}
      </button>
    </div>
  );
};
