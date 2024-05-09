import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DocRegister.scss";

const DocRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    name: "",
    list_motywacyjny: "",
    wyksztalcenie: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fetch("http://localhost:3008/consultant/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          const data = response.json().then((data) => {
            localStorage.setItem("username", data.data.user.username);
            localStorage.setItem("token", data.data.user.token);
            navigate("/");
          });

          console.log("Successfully registered");
          console.log(data);
          console.log("Rejestracja udana!");
        } else {
          console.error("Błąd rejestracji:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Wystąpił błąd:", error);
      });
  };

  const back = () => {
    navigate("/");
  };

  return (
    <div className="DocRegister">
      <div className="head">
        <button onClick={back} className="back">
          Wróć
        </button>
        <img src="/Logo.png" alt="" />
      </div>
      <div className="content">
        <div className="left">
          <h1>Dane osobowe</h1>
          <div className="box">
            <input
              type="text"
              placeholder="nazwa"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Imię"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Hasło"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Telefon"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Wykształcenie"
              name="wyksztalcenie"
              value={formData.wyksztalcenie}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Wpisz swój list motywacyjny"
              name="list_motywacyjny"
              value={formData.list_motywacyjny}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    consent: e.target.checked,
                  }))
                }
              />
              Zgadzam się na warunki
            </label>
          </div>
        </div>
        <div className="Footer">
          <button onClick={handleSubmit}>Aplikuj</button>
        </div>
      </div>
    </div>
  );
};

export default DocRegister;
