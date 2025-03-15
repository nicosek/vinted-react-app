import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./SignupModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        Cookies.set("vinted_token", response.data.token, { expires: 3 });
        onClose();
      }
    } catch (error) {
      console.error("Erreur de connexion :", error.response?.data?.message);
      setError(
        error.response?.data?.message || "Email ou mot de passe incorrect."
      );
    }
  };

  const handleClose = () => {
    setError("");
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ✖
        </button>
        <h2>Se connecter</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
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

          {error && <p className="error-message">{error}</p>}
          <button type="submit">Se connecter</button>

          {/* Lien vers l'inscription */}
          <p className="modal-footer">
            Pas encore de compte ?{" "}
            <span className="signup-link">Inscris-toi !</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
