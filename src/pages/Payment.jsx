import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { fetchOfferById } from "../utils/api";
import PaymentSummary from "../components/PaymentSummary";
import "./Payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [options, setOptions] = useState(null);
  const { id: offerId } = useParams();
  const location = useLocation();
  const [offer, setOffer] = useState(location.state?.offer || null);

  useEffect(() => {
    const fetchAndSetOffer = async () => {
      let offerData = offer; // Utiliser l'offer du state s'il existe

      if (!offer) {
        offerData = await fetchOfferById(offerId); // Fetch uniquement si nécessaire
        setOffer(offerData);
      }

      if (offerData && offerData.product_price) {
        setOptions({
          mode: "payment",
          amount: offerData.product_price * 100, // Stripe attend les centimes
          currency: "eur",
        });
      }
    };

    fetchAndSetOffer();
  }, [offer, offerId]);

  return (
    <div className="payment-container">
      {!offer ? (
        <p>Chargement de l'offre...</p>
      ) : (
        <>
          <PaymentSummary offer={offer} />

          {options && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm offer={offer} />
            </Elements>
          )}
        </>
      )}
    </div>
  );
};

export default Payment;
