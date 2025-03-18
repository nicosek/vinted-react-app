import { Link } from "react-router-dom";
import "./OfferCard.css";

const OfferCard = ({ offer }) => {
  const imageUrl = offer.product_image
    ? offer.product_image.secure_url
    : "/placeholder.jpg"; // Image par défaut

  return (
    <div className="offer-card">
      <Link to={`/offer/${offer.id}`} className="offer-link">
        <img src={imageUrl} alt={offer.product_name} />
        <div className="offer-details">
          <p className="offer-price">{offer.product_price} €</p>
          <p className="offer-title">{offer.product_name}</p>
          <p className="offer-seller">
            {offer.owner?.account?.username || "Utilisateur inconnu"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default OfferCard;
