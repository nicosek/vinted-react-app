import { useState, useEffect, useRef } from "react";
import "./Home.css";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { fetchOffers } from "../utils/api";

const Home = ({ filters, setCurrentPage, currentPage }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const getOffers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchOffers(filters, currentPage);
      setOffers(data.offers);
      setTotalPages(Math.ceil(data.total / 10));
    } catch (error) {
      console.error("Erreur lors du fetch des offres :", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const prevPage = useRef(currentPage);
  const isFirstRender = useRef(true); // ✅ Ajout d'un flag pour détecter le premier rendu

  useEffect(() => {
    console.log("🟢 [filters] useEffect déclenché avec filters:", filters);
    console.log("📌 Valeur de prevPage.current AVANT :", prevPage.current);
    if (!isFirstRender.current && prevPage.current === 1) {
      console.log("🚀 Fetch déclenché dans [filters]");
      getOffers(filters, currentPage);
    }
    prevPage.current = currentPage;
  }, [filters]);

  useEffect(() => {
    console.log(
      "🔵 [currentPage] useEffect déclenché avec currentPage:",
      currentPage
    );
    getOffers(filters, currentPage);
    prevPage.current = currentPage;
    isFirstRender.current = false;
  }, [currentPage]);

  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="home-container">
      <section className="banner">
        <div className="banner-overlay">
          <div className="banner-content">
            <h2>Prêts à faire du tri dans vos placards ?</h2>
            <button className="btn-sell">Commencer à vendre</button>
          </div>
        </div>
      </section>

      <section className="offers">
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <>
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />

            <div className="offers-container">
              {offers.map((offer) => {
                const imageUrl = offer.product_image
                  ? offer.product_image.secure_url
                  : "/placeholder.jpg"; // Image par défaut

                return (
                  <div key={offer.id} className="offer-card">
                    <Link to={`/offer/${offer.id}`} className="offer-link">
                      <img src={imageUrl} alt={offer.product_name} />
                      <div className="offer-details">
                        <p className="offer-price">{offer.product_price} €</p>
                        <p className="offer-title">{offer.product_name}</p>
                        <p className="offer-seller">
                          {offer.owner?.account?.username ||
                            "Utilisateur inconnu"}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
