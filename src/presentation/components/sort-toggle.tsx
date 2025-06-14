import { useAppState } from '../../infrastructure/store/appState';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

export const SortToggle = () => {
  const sortOrder = useAppState((s) => s.sortOrder);
  const setSortOrder = useAppState((s) => s.setSortOrder);

  const toggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-5 py-2 mt-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition text-sm shadow-sm justify-end *:hover:bg-purple-200 text-purple-700  ${
        sortOrder === 'asc' ? 'bg-purple-100 border-purple-300 text-purple-800 font-medium' : ''}"
    >
      {sortOrder === 'asc' ? (
        <>
          <FaSortAlphaDown />A → Z
        </>
      ) : (
        <>
          <FaSortAlphaUp />Z → A
        </>
      )}
    </button>
  );
};
