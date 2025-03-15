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
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
};

export default App;
