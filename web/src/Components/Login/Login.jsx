// Login.jsx
import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3008/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("username", data.data.user.username);
        localStorage.setItem("token", data.data.user.token);
        navigate("/");
      } else {
        console.error("Nie udało się zalogować");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas logowania:", error);
    }
  };

  const back = () => {
    navigate("/");
  };
  const register = () => {
    navigate("/register");
  };

  return (
    <section className="main-page">
      <div className="login-form">
        <h1>Welcome!</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit">Zaloguj się</button>
        </form>
        <button onClick={register}>Nie masz konta? załóż je !</button>
        <button onClick={back} className="back">
          Wróć
        </button>
      </div>
      <div className="logo">
        <img src="/Logo.png" alt="Logo" />
      </div>
    </section>
  );
};

export default Login;
