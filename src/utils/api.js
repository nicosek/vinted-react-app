import axios from "axios";
import { API_URL, VINTED_AUTH_COOKIES_NAME } from "../config";
import Cookies from "js-cookie";

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
      ...(filters.status && { status: filters.status }),
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

// Login
export const Login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    return response.data; // Renvoie l'objet contenant le auth_token
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Email ou mot de passe incorrect."
    );
  }
};

// 📌 Création d'une offre
export const createOffer = async (formData) => {
  try {
    // Création du formData pour l'upload
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Requête POST avec authentification
    const response = await axios.post(`${API_URL}/offers`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get(VINTED_AUTH_COOKIES_NAME)}`, // Authentification
        "Content-Type": "multipart/form-data", // Format d'envoi
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'offre :", error);
    throw error; // Propager l'erreur pour gestion en front
  }
};

export const initiatePayment = async (offerId) => {
  try {
    const response = await axios.post(
      `${API_URL}/offers/${offerId}/initiate_payment`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get(VINTED_AUTH_COOKIES_NAME)}`,
        },
      }
    );

    return response.data.clientSecret;
  } catch (error) {
    console.error("Erreur lors de l'initiation du paiement :", error);
    throw error;
  }
};
