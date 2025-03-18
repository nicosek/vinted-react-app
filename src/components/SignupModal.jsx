import { useState } from "react";
import { Signup } from "../utils/api";
import Cookies from "js-cookie";
import "./SignupModal.css";

const SignupModal = ({ isOpen, onClose, setIsLoginModalOpen, onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await Signup({ email, username, password, newsletter });

      if (data.token) {
        onSignup(data.token);
      }
    } catch (error) {
      console.error(
        "Erreur d'inscription :",
        error.message || "Une erreur est survenue."
      );
      setError(error.message || "Une erreur est survenue.");
    }
  };

  const handleClose = () => {
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
    setNewsletter("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ✖
        </button>
        <h2>S'inscrire</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Section Newsletter */}
          <label>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />{" "}
            S'inscrire à notre newsletter
          </label>
          <p className="newsletter-info">
            En m'inscrivant je confirme avoir lu et accepté les{" "}
            <a href="#">Termes & Conditions</a> et{" "}
            <a href="#">Politique de Confidentialité</a> de Vinted.
            <br />
            Je confirme avoir au moins 18 ans.
          </p>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">S'inscrire</button>

          {/* Lien vers la connexion */}
          <p className="modal-footer">
            Tu as déjà un compte ?{" "}
            <span
              className="switch-modal"
              onClick={() => {
                onClose();
                setIsLoginModalOpen(true);
              }}
            >
              Connecte-toi !
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
