import React from "react";
import "./FAQ.scss";

const FAQ = () => {
  return (
    <div className="FAQ">
      <h1>Często zadawane pytania</h1>
      <div className="box-container">
        <div className="container-1">
          <div className="box">
            <span>Jak działa wirtualny psycholog AI na waszej stronie?</span>
            <hr />
            <p>
              Nasz wirtualny psycholog AI wykorzystuje zaawansowane algorytmy i
              technologie przetwarzania języka naturalnego, aby rozpoznawać i
              odpowiadać na pytania oraz udzielać porad psychologicznych na
              podstawie zgromadzonej wiedzy.
            </p>
          </div>
          <div className="box">
            <span>
              Czy wirtualny psycholog jest dostępny przez całą dobę, 7 dni w
              tygodniu?
            </span>
            <hr />
            <p>
              Tak, nasz wirtualny psycholog jest dostępny online przez całą
              dobę, 7 dni w tygodniu, aby zapewnić wsparcie i pomoc w każdej
              chwili, gdy go potrzebujesz.
            </p>
          </div>
          <div className="box">
            <span>
              Jakie rodzaje porad psychologicznych oferuje wasza strona?
            </span>
            <hr />
            <p>
              Nasza strona oferuje szeroki zakres porad psychologicznych,
              obejmujących tematy takie jak radzenie sobie ze stresem,
              zarządzanie emocjami, radzenie sobie z trudnościami w relacjach,
              kwestie zdrowia psychicznego i wiele innych.
            </p>
          </div>
        </div>
        <div className="container-2">
          <div className="box">
            <span>
              Czy mogę uzyskać pomoc w sytuacjach kryzysowych za pośrednictwem
              wirtualnego psychologa?
            </span>
            <hr />
            <p>
              Tak, nasz wirtualny psycholog jest przystosowany do udzielania
              wsparcia w sytuacjach kryzysowych i może kierować użytkowników do
              odpowiednich zasobów i instytucji w przypadku pilnej potrzeby.
            </p>
          </div>
          <div className="box">
            <span>
              Czy rozmowy z wirtualnym psychologiem są poufne i bezpieczne?
            </span>
            <hr />
            <p>
              Tak, rozmowy z naszym wirtualnym psychologiem są poufne i
              bezpieczne. Dbamy o zachowanie prywatności i bezpieczeństwo danych
              naszych użytkowników.
            </p>
          </div>
          <div className="box">
            <span>
              Jak mogę skorzystać z usług waszej poradni psychologicznej?
            </span>
            <hr />
            <p>
              Aby skorzystać z usług naszej poradni psychologicznej, wystarczy
              zalogować się na naszą stronę i skorzystać z wirtualnego
              psychologa AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
