import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    consent: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const register = () => {
    navigate("/");
  };

  const DocRegister = () => {
    navigate("/docregister");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3008/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.user.token}; path=/`;
      } else {
        console.error("Nie udało się zarejestrować użytkownika");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas rejestracji:", error);
    }
  };

  return (
    <section className="main-page">
      <div className="register-form">
        <h1>Welcome!</h1>
        <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <label>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
            />
            Zgadzam się na regulamin
          </label>
          <button onClick={register} type="submit">
            Zarejestruj się
          </button>
          <button onClick={DocRegister}>Rejestracja konsultanta</button>
        </form>
      </div>
      <div className="logo">
        <img src="/Logo.png" alt="Logo" />
      </div>
    </section>
  );
};

export default Register;
