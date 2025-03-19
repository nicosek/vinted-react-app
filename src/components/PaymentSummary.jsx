import "./PaymentSummary.css";

const PaymentSummary = ({ offer }) => {
  return (
    <div className="payment-summary">
      <h2>Paiement</h2>
      <p>
        Article : <strong>{offer.product_name}</strong>
      </p>
      <p>
        Montant total : <strong>{offer.product_price} €</strong>
      </p>
    </div>
  );
};

export default PaymentSummary;
