import { useState, useEffect } from "react";
import "./Publish.css";
import { createOffer } from "../utils/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [formData, setFormData] = useState({
    picture: null,
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    condition: "",
    location: "",
    price: "",
    exchange: false,
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const token = Cookies.get("vinted_cookie");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        picture: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      picture: null,
    }));
    setPreview(null);

    // Réinitialiser le champ de fichier pour permettre une nouvelle sélection
    document.getElementById("picture").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        alert("Vous devez être connecté pour publier une offre.");
        return;
      }

      const data = await createOffer(formData, token);
      console.log("Offre créée avec succès :", data);

      navigate(`/offer/${data.id}`);
    } catch (error) {
      if (error.response) {
        // Si l'API renvoie une erreur 400
        if (error.response.status === 400) {
          setErrorMessage(
            `Le formulaire est invalide : ${error.response.data.message}`
          );
        } else {
          setErrorMessage(error.response.data.message); // Autres erreurs API
        }
      } else {
        setErrorMessage(
          "Une erreur interne est survenue. Détails : " + error.message
        );
      }
    }
  };

  return (
    <div className="publish-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit}>
        {/* SECTION PHOTO */}
        <fieldset className="form-section file-upload-container">
          <label htmlFor="picture" className="file-label">
            <div className="upload-content">
              {/* Aperçu de l'image sélectionnée */}
              {preview && (
                <div className="preview-wrapper">
                  <img src={preview} alt="Aperçu" className="preview-image" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={(e) => removeImage(e)}
                  >
                    ✖
                  </button>
                  <p className="file-name">{formData.picture.name}</p>
                </div>
              )}

              {/* Bouton "Ajoute une photo" toujours visible */}
              <button
                type="button"
                className="btn-upload"
                onClick={() => document.getElementById("picture").click()}
              >
                + Ajoute une photo
              </button>
            </div>
          </label>

          {/* Input file caché */}
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </fieldset>

        {/* SECTION TITRE / DESCRIPTION */}
        <fieldset className="form-section">
          <div className="form-group">
            <label>Titre*</label>
            <input
              type="text"
              name="title"
              placeholder="ex: Chemise Sézane verte"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Décris ton article*</label>
            <textarea
              name="description"
              placeholder="ex: porté quelques fois, taille correctement (500 caractères max)"
              maxLength="500"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </fieldset>

        {/* SECTION DÉTAILS */}
        <fieldset className="form-section">
          <div className="form-group">
            <label>Marque</label>
            <input
              type="text"
              name="brand"
              placeholder="ex: Zara"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Taille</label>
            <input
              type="text"
              name="size"
              placeholder="ex: L / 40 / 12"
              value={formData.size}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Couleur</label>
            <input
              type="text"
              name="color"
              placeholder="ex: Fushia"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>État</label>
            <input
              type="text"
              name="condition"
              placeholder="Neuf avec étiquette"
              value={formData.condition}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Lieu</label>
            <input
              type="text"
              name="location"
              placeholder="ex: Paris"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* SECTION PRIX */}
        <fieldset className="form-section">
          <div className="form-group">
            <label>Prix*</label>
            <input
              type="number"
              name="price"
              placeholder="0,00 €"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <div className="void-label"></div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="exchange"
                checked={formData.exchange}
                onChange={handleChange}
              />
              <span>Je suis intéressé(e) par les échanges</span>
            </label>
          </div>
        </fieldset>

        {/* BOUTON AJOUTER */}
        <div className="btn-container">
          <button type="submit" className="btn-submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
