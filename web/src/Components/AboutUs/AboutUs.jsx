import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="page">
      <div className="header">
        <div className="logo">
          <img src="/Logo.png" alt="Logo" />
        </div>
      </div>
      <h1>Trochę o nas</h1>
      <p>
        CYK - czyli Cure Your Krisis - to organizacja niosąca pomoc psychiczną w
        dowolnym miejscu, o dowolnej porze, za pomocą sztucznej inteligencji.
        Nasze AI zostało przetrenowane, by rozmawiać z ludźmi o ich problemach i
        emocjach, oraz udzielać im jak najtrafniejszych odpowiedzi. Działamy w
        100% poprzez internet, a jeśli nie czujesz się komfortowo z AI, możesz
        także porozmawiać z prawdziwym psychologiem.
      </p>
    </div>
  );
};

export default AboutUs;
