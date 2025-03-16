import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import PriceSortToggle from "./PriceSortToggle";
import SearchBar from "./SearchBar";
import PriceRangeSlider from "./PriceRangeSlider";

const Header = ({
  token,
  setIsSignupModalOpen,
  setIsLoginModalOpen,
  handleLogout,
  setFilters,
}) => {
  const [sortOrder, setSortOrder] = useState("price-asc"); // Par défaut tri croissant

  const handleSortOrderToggle = () => {
    setSortOrder((prev) => (prev === "price-asc" ? "price-desc" : "price-asc"));
    setFilters((prev) => ({
      ...prev,
      sort: sortOrder === "price-asc" ? "price-desc" : "price-asc",
    }));
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to={`/`} className="offer-link">
          <h1 className="logo">Vinted</h1>
        </Link>

        <div className="search-filters">
          {/* Search Bar (prend toute la largeur) */}
          <SearchBar setFilters={setFilters} />

          {/* Conteneur pour le tri et le slider */}
          <div className="filters-container">
            {/* Toggle du tri */}
            <PriceSortToggle
              sortOrder={sortOrder}
              handleSortOrderToggle={handleSortOrderToggle}
            />

            {/* Slider Prix */}
            <PriceRangeSlider setFilters={setFilters} />
          </div>
        </div>

        {/* Boutons de navigation */}
        <div className="header-buttons">
          {token ? (
            <>
              <button
                className="btn-disconnect btn-solid"
                onClick={handleLogout}
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-outline"
                onClick={() => {
                  setIsSignupModalOpen(true);
                  setIsLoginModalOpen(false);
                }}
              >
                S'inscrire
              </button>
              <button
                className="btn-outline"
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsSignupModalOpen(false);
                }}
              >
                Se connecter
              </button>
            </>
          )}
          <button className="btn-solid">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
