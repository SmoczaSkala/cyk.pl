import React from "react";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Header from "../../Components/Header/Header";
import HeaderLogedIn from "../HeaderLogedIn/HeaderLogedIn";

const AboutUsViews = () => {
  const username = localStorage.getItem("username");

  return (
    <section>
      {username ? <HeaderLogedIn /> : <Header />}
      <AboutUs />
    </section>
  );
};

export default AboutUsViews;
