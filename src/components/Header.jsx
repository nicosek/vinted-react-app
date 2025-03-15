import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({
  token,
  setIsSignupModalOpen,
  setIsLoginModalOpen,
  handleLogout,
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to={`/`} className="offer-link">
          <h1 className="logo">Vinted</h1>
        </Link>
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
