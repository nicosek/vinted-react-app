import { useState, useEffect, useRef } from "react";
import "./Home.css";
import Banner from "../components/Banner";
import Pagination from "../components/Pagination";
import OfferCard from "../components/OfferCard";
import { fetchOffers } from "../utils/api";

const Home = ({ filters, setCurrentPage, currentPage }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const getOffers = async (signal) => {
    try {
      setIsLoading(true);
      const data = await fetchOffers(filters, currentPage, signal);
      if (data) {
        setOffers(data.offers);
        setTotalPages(Math.ceil(data.total / 10));
      }
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
    const controller = new AbortController();
    const signal = controller.signal;
    if (!isFirstRender.current && prevPage.current === 1) {
      getOffers(signal); // 🔥 On fetch seulement si ce n'est pas le premier rendu
    }
    prevPage.current = currentPage; // ✅ Met à jour la page précédente
    return () => {
      controller.abort(); // ⛔ Annule la requête en cours si le composant change
    };
  }, [filters]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getOffers(signal); // 🔄 On fetch toujours quand la page change
    prevPage.current = currentPage; // ✅ Met à jour la page précédente
    isFirstRender.current = false; // ✅ Désactive le flag après le premier rendu

    return () => {
      controller.abort(); // ⛔ Annule la requête en cours si le composant change
    };
  }, [currentPage]);

  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="home-container">
      <Banner />

      <section className="offers">
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
            <div className="offers-container">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
            ;
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
