import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL; // ✅ Utilisation de la variable d'environnement
import API_URL from "../config";

// 🛍 Récupère les offres avec les filtres et la pagination
export const fetchOffers = async (filters, currentPage, signal, limit = 10) => {
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
    const response = await axios.get(`${API_URL}/offers?${params}`, { signal });

    return response?.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error("Erreur lors de la récupération des offres :", error);
    }

    return null;
  }
};

// 📌 Récupère une offre spécifique par son ID
export const fetchOfferById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/offers/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'offre :", error);
    throw error;
  }
};

// Signup
export const Signup = async (userData) => {
  try {
    const formattedData = {
      email: userData.email,
      password: userData.password,
      newsletter: userData.newsletter,
      account: { username: userData.username },
    };

    const response = await axios.post(`${API_URL}/user/signup`, formattedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erreur d'inscription");
  }
};
