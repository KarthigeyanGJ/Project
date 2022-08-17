import React from "react";
import "./home.css";
import "../../CSS/style.css";
import FunHeader from "../Header/FunHeader";
import Director from "./Director";
import AboutUs from "./AboutUs";
import Cover from "./Cover";
import ContactUs from "./ContactUs";

function Home(props) {
  return (
    <>
      <FunHeader/>
      <Cover />
      <AboutUs />
      <ContactUs/>
      <Director />
    </>
  );
}

export default Home;
