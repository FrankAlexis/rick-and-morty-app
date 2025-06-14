import {useCharacterListController} from "../../presentation/controllers/use-character-list-controller";
import {useAppState} from "../../infrastructure/store/appState";
import {Character} from "../../domain/entities/character";
import {useState} from "react";
import {CharacterListItem} from "../../presentation/components/character-list-item";
import CharacterDetail from "../../presentation/components/character-detail";
import {FilterPanel} from "../../presentation/components/filter-panel";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const {characters} = useCharacterListController();
  const {isFavorite, filters} = useAppState();

  const starred =
    filters.character === "Starred" || filters.character === "All"
      ? characters.filter((c) => isFavorite(c.id))
      : [];
  const others =
    filters.character === "Others" || filters.character === "All"
      ? characters.filter((c) => !isFavorite(c.id))
      : [];

  const handleClick = (character: Character) => {
    setSelectedCharacter(character);
    setMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Hamburger Button (mobile only) */}
      <button
        className="absolute top-4 left-4 z-50 bg-white p-2 rounded shadow lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-r p-4 pt-20 lg:pt-4 w-72 z-40 absolute lg:static top-0 h-full transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex lg:flex-col overflow-y-auto`}
      >
        <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
          Rick and Morty list
        </h2>

        {/* Filter Panel */}
        <FilterPanel />

        {/* STARRED */}
        {starred.length > 0 && (
          <>
            <h3 className="text-sm font-semibold text-gray-500 mb-1">
              STARRED CHARACTERS ({starred.length})
            </h3>
            <ul className="mb-4">
              {starred.map((c) => (
                <CharacterListItem
                  key={c.id}
                  character={c}
                  isFavorite={true}
                  selected={selectedCharacter?.id === c.id}
                  onClick={handleClick}
                />
              ))}
            </ul>
          </>
        )}

        {/* CHARACTERS */}
        {others.length > 0 && (
          <h3 className="text-sm font-semibold text-gray-500 mb-1">
            CHARACTERS ({others.length})
          </h3>
        )}
        <ul>
          {others.map((c) => (
            <CharacterListItem
              key={c.id}
              character={c}
              isFavorite={false}
              selected={selectedCharacter?.id === c.id}
              onClick={handleClick}
            />
          ))}
        </ul>
      </aside>

      {/* Right Panel */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-center h-full text-gray-400 italic px-4 text-center">
          {selectedCharacter ? (
            <CharacterDetail character={selectedCharacter} />
          ) : (
            <p>Select a character to see details</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
