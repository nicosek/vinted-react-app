import { useState } from "react";
import { Search } from "@mui/icons-material";
import "./SearchBar.css";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = ({ setFilters, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Déclenche la recherche lors d'un "Enter"
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilters((prev) => ({
        ...prev,
        title: searchTerm,
      }));
      setCurrentPage(1);
      if (location.pathname !== "/") {
        navigate("/"); // 🔥 On retourne à Home si on n'y est pas déjà
      }
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
