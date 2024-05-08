// Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Header/Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  // Sprawdzamy, czy użytkownik jest zalogowany po odświeżeniu strony
  useState(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/LogIn");
  };

  const handleSignUp = () => {
    setLoggedIn(false);
    navigate("/register");
  };

  const aboutUs = () => {
    navigate("/aboutus");
  };

  const home = () => {
    navigate("/");
  };

  const faq = () => {
    navigate("/faq");
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
        </div>
        <div className="Login">
          {!loggedIn ? (
            <div className="LogIn">
              <button onClick={handleLogin}>Zaloguj się</button>
            </div>
          ) : null}
          <div className="SignUp">
            <button onClick={handleSignUp}>Zarejestruj się</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
