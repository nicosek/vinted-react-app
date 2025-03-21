import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Offer.css";
import { fetchOfferById } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Offer = ({ setIsLoginModalOpen }) => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get("vinted_cookie");

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setOffer(await fetchOfferById(id));
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

  const handleBuyClick = () => {
    if (!token) {
      // 🔴 Si l'utilisateur n'est pas connecté, on ouvre le modal Login
      setIsLoginModalOpen(true);
    } else {
      // 🟢 Sinon, on l'emmène vers /payment avec les infos de l'offre
      navigate(`/offer/${offer.id}/payment`, { state: { offer } });
    }
  };

  return (
    <div className="offer-container">
      <div className="offer-image">
        {offer.status === "sold" && <div className="sold-badge-big">VENDU</div>}
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
              src={offer.owner.account?.avatar?.secure_url}
              alt={offer.owner.account?.username}
            />
          )}
          <span>{offer.owner.account.username}</span>
        </div>
        <button
          className="buy-button"
          onClick={handleBuyClick}
          disabled={offer.status === "sold"}
        >
          {offer.status === "sold" ? "Vendu" : "Acheter"}
        </button>
      </div>
    </div>
  );
};

export default Offer;
