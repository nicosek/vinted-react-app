import { useState } from "react";
import { Search } from "@mui/icons-material";
import "./SearchBar.css";

const SearchBar = ({ setFilters }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Déclenche la recherche lors d'un "Enter"
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilters((prev) => ({
        ...prev,
        title: searchTerm,
      }));
    }
    if (event.key === "Escape") {
      handleReset();
    }
  };

  // Réinitialisation en appuyant sur "Escape"
  const handleReset = () => {
    setSearchTerm(""); // Vide l'input
    setFilters((prev) => ({
      ...prev,
      title: undefined, // Supprime le filtre de recherche
    }));
  };

  return (
    <div className="search-bar">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
