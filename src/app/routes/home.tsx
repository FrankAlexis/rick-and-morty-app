import { useCharacterListController } from '../../presentation/controllers/use-character-list-controller';
import { Character } from '../../domain/entities/character';
import { useState } from 'react';
import { CharacterListItem } from '../../presentation/components/character-list-item';
import { FilterPanel } from '../../presentation/components/filter-panel';
import { SortToggle } from '../../presentation/components/sort-toggle';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loader } from '../../presentation/components/loader';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    starred,
    others,
    setSelectedCharacterId,
    selectedCharacterId,
    amountOfFilters,
    total,
    isLoading,
  } = useCharacterListController();
  const navigate = useNavigate();

  const handleClick = (character: Character) => {
    setSelectedCharacterId(character.id);
    setMenuOpen(false);
    navigate(`/character/${character.id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
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
        className={`bg-white border-r p-4 lg:pt-4 w-80 md:w-[400px] lg:w-[500px] z-40 absolute lg:static top-0 h-full transition-transform transform overflow-x-hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:flex lg:flex-col overflow-y-auto`}
      >
        <h2 className="text-2xl font-greycliff  pt-15 lg:pt-9 font-normal text-[#1F2937] leading-8 mb-4">
          Rick and Morty list
        </h2>

        {/* Filter Panel */}
        <header>
          <FilterPanel />
          <SortToggle />
        </header>

        <div className="mt-4">
          {amountOfFilters > 0 && (
            <div className="flex items-center justify-between m-2">
              <span className="text-sm font-semibold text-[#2563EB] mb-1 pl-4">
                {total} Results
              </span>
              <span className="text-sm font-semibold bg-[#63D83833] text-[#3B8520] mb-1 p-2 rounded-full">
                {amountOfFilters} filter{amountOfFilters !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          {isLoading && <Loader message="Fetching characters..." />}
          <>
            {/* STARRED */}
            {starred.length > 0 && (
              <>
                {amountOfFilters === 0 ? (
                  <h3 className="text-sm font-semibold text-gray-500 mb-1 pl-4">
                    STARRED CHARACTERS ({starred.length})
                  </h3>
                ) : null}
                <ul className="mb-4">
                  {starred.map((c) => (
                    <CharacterListItem
                      key={c.id}
                      character={c}
                      isFavorite={true}
                      selected={selectedCharacterId === c.id}
                      onClick={handleClick}
                    />
                  ))}
                </ul>
              </>
            )}

            {/* CHARACTERS */}
            {others.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-gray-500 my-5 pl-4">
                  CHARACTERS ({others.length})
                </h3>
                <ul>
                  {others.map((c) => (
                    <CharacterListItem
                      className="border-t border-gray-200 py-[1px]"
                      key={c.id}
                      character={c}
                      isFavorite={false}
                      selected={selectedCharacterId === c.id}
                      onClick={handleClick}
                    />
                  ))}
                </ul>
              </>
            )}
          </>
        </div>
      </aside>

      {/* Right Panel - Main content */}
      <main className="min-h-screen bg-gray-50 w-full transition-all duration-300">
        <div className="grid grid-cols-1 gap-6 relative mt-15">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
