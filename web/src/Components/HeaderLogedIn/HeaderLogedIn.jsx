// HeaderLoggedIn.jsx
import React from "react";
import "./HeaderLogedIn.scss";
import { useNavigate } from "react-router-dom";

const HeaderLoggedIn = () => {
  const navigate = useNavigate();

  const aboutUs = () => {
    navigate("/aboutus");
  };

  const home = () => {
    navigate("/");
  };

  const faq = () => {
    navigate("/faq");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/LogIn");
  };

  return (
    <header>
      <div className="header">
        <div className="logo">
          <button className="home" onClick={home}>
            <img src="/Logo.png" alt="Logo" />
          </button>
        </div>
        <div className="info">
          <button onClick={aboutUs} className="about-us">
            About Us
          </button>
          <button onClick={faq} className="FAQ">
            FAQ
          </button>
          <button onClick={handleLogout} className="log-out">
            Wyloguj
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderLoggedIn;
