import React from "react";
import "./WhyUs.scss";

const WhyUs = () => {
  return (
    <section className="page">
      <div className="WhyUs">
        <h1>Dlaczego akurat my:</h1>
        <div className="Content">
          <h1>Zadbamy aby wszystkie twoje problemy zostały rozwiązane</h1>
          <div className="boxes">
            <div className="box">
              <img src="" alt="" />
              <p>
                Nie musisz czekać na termin wizyty ani dostosowywać się do
                godzin pracy - nasz wirtualny psycholog jest gotowy do rozmowy z
                Tobą 24 godziny na dobę, 7 dni w tygodniu.
              </p>
            </div>
            <div className="box">
              <img src="" alt="" />
              <p>
                Zapewniamy pełne bezpieczeństwo danych naszych pacjentów. Ich
                wyznania są poufne i chronione przed nieuprawnionym dostępem.
              </p>
            </div>
            <div className="box">
              <img src="" alt="" />
              <p>
                Stosujemy zaawansowaną technologię sztucznej inteligencji (AI),
                która umożliwia personalizowane i skuteczne porady
                psychologiczne, dostosowane do indywidualnych potrzeb każdego
                pacjenta.
              </p>
            </div>
            <div className="box">
              <img src="" alt="" />
              <p>
                W naszej poradni znajdziesz doświadczonych psychologów, gotowych
                służyć wsparciem w różnych aspektach zdrowia psychicznego..
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
