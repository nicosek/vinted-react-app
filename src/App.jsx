import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";

const App = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get("vinted_cookie") || null);
  const [filters, setFilters] = useState({ sort: "price-asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1); // 🔥 Toujours revenir en page 1 quand on change un filtre
  };

  const handleLogin = (newToken) => {
    Cookies.set("vinted_cookie", newToken, { expires: 3 });
    setToken(newToken);
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("vinted_cookie");
    setToken(null);
  };

  const handlePublishClick = (navigate) => {
    if (token) {
      navigate("/publish");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        setIsSignupModalOpen={setIsSignupModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLogout={handleLogout}
        filters={filters}
        updateFilters={updateFilters}
        setCurrentPage={setCurrentPage}
        handlePublishClick={handlePublishClick}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSignup={handleLogin}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        setIsSignupModalOpen={setIsSignupModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              filters={filters}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              handlePublishClick={handlePublishClick}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </Router>
  );
};

export default App;
