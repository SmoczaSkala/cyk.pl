import React from "react";
import { useNavigate } from "react-router-dom";
import "./TitlePage.scss";

const TitlePage = () => {
  const navigate = useNavigate();

  const chat = () => {
    navigate("/chat");
  };

  return (
    <section>
      <div className="TitlePage">
        <div className="Title">
          <h1>Uwolnij się od problemów i zacznij sie pełnią życia</h1>
        </div>
        <div className="Content">
          <p>
            Zadbaj o swoje zdrowie psychiczne z naszym wirtualnym psychologie.
            Oferujemy łatwy dostęp do profesjonalnej pomocy online. Bez kolejek,
            bez stresu. Zacznij dbać o siebie już dziś.
          </p>
        </div>
        <button onClick={chat}>Rozpocznij Czat</button>
      </div>
    </section>
  );
};

export default TitlePage;
