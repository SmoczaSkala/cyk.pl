import React from "react";
import FAQ from "../../Components/FAQ/FAQ";
import Header from "../../Components/Header/Header";
import HeaderLogedIn from "../HeaderLogedIn/HeaderLogedIn";

const FAQview = () => {
  const username = localStorage.getItem("username");
  return (
    <section>
      {username ? <HeaderLogedIn /> : <Header />}
      <FAQ />
    </section>
  );
};

export default FAQview;
