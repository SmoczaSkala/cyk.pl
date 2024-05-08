import React from "react";
import "./Offer.scss";

const Offer = () => {
  return (
    <section>
      <div className="Offer">
        <h1>Oferujemy:</h1>
        <div className="boxes">
          <div className="box">
            <img src="" alt="" />
            <p>
              Nie ma znaczenia, czy jest dzień czy noc, czy właśnie przeżywasz
              chwilę trudności, czy po prostu szukasz wsparcia - nasza poradnia
              psychologiczna jest zawsze dostępna.
            </p>
          </div>
          <div className="box">
            <img src="" alt="" />
            <p>
              Nasza poradnia jest w pełni darmowa dla wszystkich użytkowników.
              Dzięki temu każdy może skorzystać z profesjonalnej pomocy
              psychologicznej bez obaw o koszty.
            </p>
          </div>
          <div className="box">
            <img src="" alt="" />
            <p>
              Dbamy o indywidualne potrzeby każdego pacjenta, dostarczając
              spersonalizowanej pomocy i wsparcia, które uwzględniają ich
              unikalne sytuacje życiowe i cele terapeutyczne.
            </p>
          </div>
          <div className="box">
            <img src="" alt="" />
            <p>
              Nasza poradnia obejmuje szeroki zakres tematów, z którymi nasi
              pacjenci mogą się zwrócić, począwszy od stresu i lęków, po
              problemy relacyjne i trudności w codziennym funkcjonowaniu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
