import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { initiatePayment } from "../utils/api"; // 🔥 Import de la méthode API
import { FRONT_URL } from "../config";
import PaymentSuccess from "../components/PaymentSuccess";
import "./CheckoutForm.css";

const CheckoutForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) return;

    try {
      // 🔥 1. Soumission des éléments pour validation
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setIsLoading(false);
        return;
      }

      // 🔥 2. Appel API pour récupérer le clientSecret
      const clientSecret = await initiatePayment(offer.id);

      // 🔥 3. Confirmation du paiement avec Stripe
      const stripeResponse = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: FRONT_URL,
        },
        redirect: "if_required",
      });

      // 🔥 4. Gestion des erreurs ou succès
      if (stripeResponse.error) {
        setErrorMessage(stripeResponse.error.message);
      } else if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.error("Erreur complète :", error);
      if (error.response) {
        console.error("Détails de l'erreur :", error.response.data);
      }
      setErrorMessage(
        `Erreur lors du paiement: "${error.message}" Veuillez réessayer.`
      );
    }

    setIsLoading(false);
  };

  return completed ? (
    <PaymentSuccess offerId={offer.id} />
  ) : (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      <button
        className="pay-button"
        type="submit"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? "Traitement en cours..." : "Payer"}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
