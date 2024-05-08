import React from "react";
import { useNavigate } from "react-router-dom";
import "./TitlePage.scss";

const TitlePage = () => {
  const navigate = useNavigate();

  const chat = () => {
    navigate("/chat");
  };

  const username = localStorage.getItem("username");

  const handleLogin = () => {
    navigate("/LogIn");
  };

  return (
    <section>
      <div className="TitlePage">
        <div className="Title">
          <h1>Uwolnij się od problemów i zacznij się pełnią życia</h1>
        </div>
        <div className="Content">
          <p>
            Zadbaj o swoje zdrowie psychiczne z naszym wirtualnym psychologiem.
            Oferujemy łatwy dostęp do profesjonalnej pomocy online. Bez kolejek,
            bez stresu. Zacznij dbać o siebie już dziś.
          </p>
        </div>
        {username ? (
          <button onClick={chat}>Rozpocznij Czat</button>
        ) : (
          <button onClick={handleLogin}>Zaloguj się</button>
        )}
      </div>
    </section>
  );
};

export default TitlePage;
