import {FC} from "react";
import {Character} from "../../domain/entities/character";
import {CiHeart} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";

type Props = {
  character: Character;
  isFavorite?: boolean;
  onClick: (character: Character) => void;
  selected?: boolean;
};

export const CharacterListItem: FC<Props> = ({
  character,
  isFavorite = false,
  onClick,
  selected = false,
}) => {
  return (
    <li
      className={`flex justify-between items-center px-3 py-2 rounded-lg transition-all cursor-pointer
    ${
      selected
        ? "bg-purple-100 text-purple-900"
        : "hover:bg-gray-100 text-gray-700"
    }`}
      onClick={() => onClick(character)}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 ml-3">
        <p className={`text-sm ${selected ? "font-semibold" : "font-medium"}`}>
          {character.name}
        </p>
        <p className="text-xs text-gray-500">{character.species}</p>
      </div>
      <span
        className={`text-lg ${
          isFavorite ? "text-green-500" : "text-gray-300"
        } ${
          selected ? "bg-white" : ""
        } rounded-full p-1 transition-all cursor-pointer`}
      >
        {isFavorite ? (
          <FaHeart className="w-5 h-5 fill-amber-200" />
        ) : (
          <CiHeart className="w-5 h-5 fill-black" />
        )}
      </span>
    </li>
  );
};
