import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import API_URL from "../config";

const Home = ({ filters }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchOffers = async () => {
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
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchOffers();
    }
  }, [filters]);

  useEffect(() => {
    fetchOffers();
  }, [currentPage]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="home-container">
      <section className="offers">
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <>
            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Précédent
              </button>

              <span>
                Page {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Suivant
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
