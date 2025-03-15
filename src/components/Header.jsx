import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ setIsSignupModalOpen, setIsLoginModalOpen }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to={`/`} className="offer-link">
          <h1 className="logo">Vinted</h1>
        </Link>
        <div className="header-buttons">
          <button
            className="btn-outline"
            onClick={() => setIsSignupModalOpen(true)}
          >
            S'inscrire
          </button>
          <button
            className="btn-outline"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Se connecter
          </button>
          <button className="btn-solid">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
