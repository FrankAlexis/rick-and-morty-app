import CharacterDetail from '../../presentation/components/character-detail';
import { Loader } from '../../presentation/components/loader';
import { useCharacterDetailController } from '../../presentation/controllers/use-character-detail-controller';
import { useNavigate } from 'react-router-dom';
export const CharacterDetailPage = () => {
  const { selectedCharacter, isLoading, isDeleted, softDeleteCharacter, restoreCharacter } =
    useCharacterDetailController();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 md:static md:col-span-2 bg-white shadow-xl rounded-lg p-6 transition-all">
      <button
        onClick={() => navigate('/')}
        className="md:hidden absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>
      {isLoading ? (
        <Loader fullScreen />
      ) : selectedCharacter ? (
        <>
          <button
            onClick={() =>
              isDeleted
                ? restoreCharacter(selectedCharacter.id)
                : softDeleteCharacter(selectedCharacter.id)
            }
            className={`mt-10 px-4 py-2 rounded text-white ${
              isDeleted ? 'bg-green-600' : 'bg-red-600'
            } hover:opacity-90 transition`}
          >
            {isDeleted ? 'Restore' : 'Delete'}
          </button>
          <CharacterDetail character={selectedCharacter} />
        </>
      ) : (
        <p>Select a character to see details</p>
      )}
    </div>
  );
};
