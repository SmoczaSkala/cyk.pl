import React from "react";
import Offer from "../../Components/Home/Offer/Offer";
import WhyUs from "../../Components/Home/WhyUs/WhyUs";
import TitlePage from "../../Components/Home/TitlePage/TitlePage";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeaderLogedIn from "../../Components/HeaderLogedIn/HeaderLogedIn";
import "./../Home/Home.scss";

const Home = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="container">
      <section className="Home-page">
        {username ? <HeaderLogedIn /> : <Header />}
        <TitlePage />
        <WhyUs />
        <Offer />
        <Footer />
      </section>
    </div>
  );
};

export default Home;
