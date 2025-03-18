import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ✅ Utilisation de la variable d'environnement

// 🛍 Récupère les offres avec les filtres et la pagination
export const fetchOffers = async (filters, currentPage, limit = 10) => {
  try {
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

    return response.data; // ✅ On retourne directement les données pour alléger Home.jsx
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des offres :", error);
    throw error; // ✅ On relance l'erreur pour la gérer dans les composants
  }
};

// 📌 Récupère une offre spécifique par son ID
export const fetchOfferById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/offers/${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'offre :", error);
    throw error;
  }
};
