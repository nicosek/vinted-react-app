import { Link } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = ({ offerId }) => {
  return (
    <div className="payment-success">
      <div className="success-message">
        ✅{" "}
        <span style={{ marginLeft: "10px" }}>
          Paiement effectué avec succès ! 🎉
        </span>
      </div>
      <Link to={`/offer/${offerId}`}>
        <button className="btn-primary">Retour à l'offre</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
