import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";

const App = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get("vinted_cookie") || null);
  const [filters, setFilters] = useState({ sort: "price-asc" });

  const handleLogin = (newToken) => {
    Cookies.set("vinted_cookie", newToken, { expires: 7 });
    setToken(newToken);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("vinted_cookie");
    setToken(null);
  };

  return (
    <Router>
      <Header
        token={token}
        setIsSignupModalOpen={setIsSignupModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLogout={handleLogout}
        setFilters={setFilters}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        setIsSignupModalOpen={setIsSignupModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      <Routes>
        <Route path="/" element={<Home filters={filters} />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
};

export default App;
