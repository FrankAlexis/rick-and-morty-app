import { FC } from 'react';
import { Character } from '../../domain/entities/character';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

type Props = {
  character: Character;
  isFavorite?: boolean;
  onClick: (character: Character) => void;
  selected?: boolean;
  className?: string;
};

export const CharacterListItem: FC<Props> = ({
  character,
  isFavorite = false,
  onClick,
  selected = false,
  className = '',
}) => {
  return (
    <li onClick={() => onClick(character)} className={className}>
      <div
        className={`flex justify-between items-center px-5 py-4 rounded-lg transition-all cursor-pointer w-full
    ${selected ? 'bg-[#EEE3FF]' : ''}`}
      >
        <img
          src={character.image}
          alt={character.name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex-1 ml-3 text-[1rem] ">
          <p className={`font-bold  text-[#111827]`}>{character.name}</p>
          <p className="text-[#6B7280]">{character.species}</p>
        </div>
        <span
          className={`text-2xl p-[7px] ${
            isFavorite ? 'text-[#53C629] border-[#53C629]' : 'text-[#D1D5DB] border-[#D1D5DB]'
          } ${selected ? 'bg-white' : ''} rounded-full p-1 transition-all cursor-pointer`}
        >
          {isFavorite ? (
            <FaHeart className="w-6 h-6 fill-[#53C629]" />
          ) : (
            <CiHeart className="w-6 h-6 fill-[#D1D5DB]" />
          )}
        </span>
      </div>
    </li>
  );
};
