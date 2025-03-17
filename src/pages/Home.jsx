import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import API_URL from "../config";

const Home = ({ filters, setCurrentPage, currentPage }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchOffers = async () => {
    console.log(
      "🔥 Fetching offers with filters:",
      filters,
      "and page:",
      currentPage
    );
    try {
      setIsLoading(true);
      const query = {
        page: currentPage,
        limit,
        ...(filters.title && { title: filters.title }),
        ...(filters.priceMin !== undefined && { priceMin: filters.priceMin }),
        ...(filters.priceMax !== undefined && { priceMax: filters.priceMax }),
        ...(filters.sort && { sort: filters.sort }),
      };

      const params = new URLSearchParams(query);
      const response = await axios.get(`${API_URL}/offers?${params}`);

      setOffers(response.data.offers);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error("Erreur lors de la récupération des offres :", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const prevFilters = useRef(filters); // Stocke les anciens filtres

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else if (
      JSON.stringify(filters) !== JSON.stringify(prevFilters.current)
    ) {
      fetchOffers();
    }
    prevFilters.current = filters; // Met à jour la référence après exécution
  }, [filters]);

  useEffect(() => {
    console.log(
      "🔥 Fetching offers with filters:",
      filters,
      "and page:",
      currentPage
    );
    fetchOffers();
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
            <div className="pagination">
              {/* Bouton Première Page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                ⏮️ Première
              </button>

              {/* Bouton -10 Pages */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 10))}
                disabled={currentPage === 1}
              >
                ◀️ -10
              </button>

              {/* Bouton Précédent */}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ⬅️ Précédent
              </button>

              <span>
                Page {currentPage} / {totalPages}
              </span>

              {/* Bouton Suivant */}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Suivant ➡️
              </button>

              {/* Bouton +10 Pages */}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 10))
                }
                disabled={currentPage === totalPages}
              >
                +10 ▶️
              </button>

              {/* Bouton Dernière Page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Dernière ⏭️
              </button>
            </div>

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
