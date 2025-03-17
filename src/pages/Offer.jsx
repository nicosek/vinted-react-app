import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Offer.css";
import API_URL from "../config";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`${API_URL}/offers/${id}`);

        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce :", error);
      }
    };

    fetchOffer();
  }, [id]);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="offer-container">
      <div className="offer-image">
        <img
          src={
            offer.product_image
              ? offer.product_image.secure_url
              : "/placeholder.jpg"
          }
          alt={offer.product_name}
        />
      </div>
      <div className="offer-page-details">
        <h2>{offer.product_price} €</h2>
        <ul>
          {offer.product_details &&
            Object.entries(offer.product_details).map(([key, value], index) => (
              <li key={index}>
                <span>{key} :</span> {value}
              </li>
            ))}
        </ul>
        <h3>{offer.product_name}</h3>
        <p>{offer.product_description}</p>
        <div className="seller-info">
          {offer.owner.account.avatar && (
            <img
              src={offer.owner.account.avatar.secure_url}
              alt={offer.owner.account.username}
            />
          )}
          <span>{offer.owner.account.username}</span>
        </div>
        <button className="buy-button">Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
