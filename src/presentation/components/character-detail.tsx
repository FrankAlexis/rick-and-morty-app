import { Character } from '../../domain/entities/character';
import { FC } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { CommentSection } from './comment-section';
import { useFavoritesController } from '../controllers/use-favorites-controller';

type Props = {
  character: Character;
};

const CharacterDetail: FC<Props> = ({ character }) => {
  const { isFavorite, toggleFavorite } = useFavoritesController();

  return (
    <div className="min-h-screen max-w-6xl bg-white">
      <div className="flex flex-col text-left ml-3 mt-3">
        <div className="relative mb-6">
          <img
            src={character.image}
            alt={character.name}
            className="m-0 w-40 h-40 rounded-full object-cover shadow-md transition-transform transform hover:scale-105"
          />
          <button
            onClick={() => toggleFavorite(character.id)}
            aria-label={isFavorite(character.id) ? 'Remove from favorites' : 'Add to favorites'}
            className={`absolute left-30 bottom-0  w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer
              ${
                isFavorite(character.id)
                  ? 'bg-green-100 text-[#53C629] border-[#53C629] hover:bg-green-200'
                  : 'text-[#D1D5DB] border-[#D1D5DB] bg-gray-50'
              }
            `}
          >
            {isFavorite(character.id) ? (
              <FaHeart className="w-4 h-4 fill-[#53C629]" />
            ) : (
              <CiHeart className="w-4 h-4 fill-[#D1D5DB]" />
            )}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-[#111827] mb-1">{character.name}</h1>
        <div className="mt-2 text-sm text-gray-700 space-y-1 align-start w-full">
          <div className="border-b border-gray-200 pb-2">
            <strong>Species:</strong>
            <p className="ml-1">{character.species}</p>
          </div>
          <div className="border-b border-gray-200 pb-2">
            <strong>Status:</strong>
            <p className="ml-1">{character.status}</p>
          </div>
          <div>
            <strong>Gender:</strong>
            <p className="ml-1">{character.gender}</p>
          </div>
        </div>
        <CommentSection characterId={character.id} />
      </div>
    </div>
  );
};

export default CharacterDetail;
