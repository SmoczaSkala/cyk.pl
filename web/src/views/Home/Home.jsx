import React from "react";
import Offer from "../../Components/Home/Offer/Offer";
import WhyUs from "../../Components/Home/WhyUs/WhyUs";
import TitlePage from "../../Components/Home/TitlePage/TitlePage";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <section>
      <Header />
      <TitlePage />
      <WhyUs />
      <Offer />
      <Footer />
    </section>
  );
};

export default Home;
