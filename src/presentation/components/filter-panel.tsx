import {useState} from "react";
import {FaSearch} from "react-icons/fa";
import {useAppState} from "../../infrastructure/store/appState";
import {GiSettingsKnobs} from "react-icons/gi";

export const FilterPanel = () => {
  const {filters, setFilter} = useAppState();
  const [showPanel, setShowPanel] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const isDisabled =
    localFilters.character === "" && localFilters.species === "";

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setLocalFilters((prev) => ({...prev, [key]: value}));
  };

  const applyFilters = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      setFilter(key as keyof typeof filters, value);
    });
    setShowPanel(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-3 text-xl shadow-sm">
        <FaSearch className="text-gray-400 mr-3 ml-2" />
        <input
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
          placeholder="Search or filter results"
          className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
        <button
          onClick={() => setShowPanel(!showPanel)}
          className={`ml-2 hover:bg-purple-200 text-purple-700  ${
            showPanel ? "bg-purple-200" : ""
          } p-2 rounded-full transition`}
        >
          <GiSettingsKnobs className="w-4 h-4" />
        </button>
      </div>

      {showPanel && (
        <div className="absolute top-14 left-0 z-50 bg-white shadow-2xl rounded-xl p-4 text-sm space-y-4 w-full">
          {/* Character Filter */}
          <div>
            <p className="text-gray-500 mb-1">Character</p>
            <div className="flex gap-2">
              {[
                {label: "All", key: "All"},
                {label: "Starred", key: "Starred"},
                {label: "Others", key: "Others"},
              ].map((option) => (
                <button
                  key={option.key}
                  className={`flex-1 py-1.5 rounded-md border
                    ${
                      localFilters.character === option.key
                        ? "bg-purple-100 border-purple-300 text-purple-800 font-medium"
                        : "bg-white border-gray-200 text-gray-500"
                    }
                  `}
                  onClick={() => handleFilterChange("character", option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Specie Filter */}
          <div>
            <p className="text-gray-500 mb-1">Specie</p>
            <div className="flex gap-2">
              {[
                {label: "All", key: ""},
                {label: "Human", key: "Human"},
                {label: "Alien", key: "Alien"},
              ].map((option) => (
                <button
                  key={option.key}
                  className={`flex-1 py-1.5 rounded-md border
                    ${
                      localFilters.species === option.key
                        ? "bg-purple-100 border-purple-300 text-purple-800 font-medium"
                        : "bg-white border-gray-200 text-gray-500"
                    }
                  `}
                  onClick={() => handleFilterChange("species", option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={applyFilters}
            disabled={isDisabled}
            className={`w-full py-2 rounded-md  font-medium transition ${
              isDisabled
                ? "cursor-not-allowed bg-gray-100 text-gray-600"
                : "bg-[#8054C7] text-white hover:bg-[#6A3BBE] cursor-pointer"
            }`}
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
};
