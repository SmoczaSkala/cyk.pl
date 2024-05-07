import React from "react";
import "./../TitlePage/TitlePage.scss";

const TitlePage = () => {
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
        <button>Rozpocznij Czat</button>
      </div>
    </section>
  );
};

export default TitlePage;
