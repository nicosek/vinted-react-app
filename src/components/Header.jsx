import "./Header.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PriceSortToggle from "./PriceSortToggle";
import SearchBar from "./SearchBar";
import PriceRangeSlider from "./PriceRangeSlider";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
  token,
  setIsSignupModalOpen,
  setIsLoginModalOpen,
  handleLogout,
  filters,
  setFilters,
  setCurrentPage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState("price-asc"); // Par défaut tri croissant

  const handleSortOrderToggle = () => {
    const newSortOrder = sortOrder === "price-asc" ? "price-desc" : "price-asc";

    setSortOrder(newSortOrder); // ✅ Mise à jour du state
    setFilters((prev) => ({
      ...prev,
      sort: newSortOrder, // ✅ Utilisation immédiate de la nouvelle valeur
    }));
  };

  const handleLogoClick = () => {
    setCurrentPage(1);
    navigate("/");
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, [filters]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="offer-link" onClick={handleLogoClick}>
          <h1 className="logo">Vinted</h1>
        </Link>

        <div className="search-filters">
          {/* Search Bar (prend toute la largeur) */}
          <SearchBar setFilters={setFilters} setCurrentPage={setCurrentPage} />

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
