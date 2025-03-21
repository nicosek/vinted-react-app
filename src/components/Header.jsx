import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PriceSortToggle from "./PriceSortToggle";
import SearchBar from "./SearchBar";
import PriceRangeSlider from "./PriceRangeSlider";
import StatusToggle from "./StatusToggle";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
  token,
  setIsSignupModalOpen,
  setIsLoginModalOpen,
  handleLogout,
  filters,
  updateFilters,
  setCurrentPage,
  handlePublishClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <SearchBar updateFilters={updateFilters} />

          {/* Conteneur pour le tri et le slider */}
          <div className="filters-container">
            {/* Toggle du tri */}
            <PriceSortToggle
              sortOrder={filters.sort}
              updateFilters={updateFilters}
            />

            {/* Slider Prix */}
            <PriceRangeSlider updateFilters={updateFilters} />

            {/* Toggle pour le statut de diponiblité */}
            <StatusToggle
              selectedStatus={filters.status}
              updateFilters={updateFilters}
            />
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
          <button
            className="btn-sell"
            onClick={() => handlePublishClick(navigate)}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
