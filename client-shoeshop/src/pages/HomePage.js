import React from "react";
import Header from "../components/header/Header";
import Carousel from "../components/Slider/Carousel";
import Carousel2 from "../components/Slider/Carousel2";
import Nike from "../components/HotSale/components/Nike";
import Adidas from "../components/HotSale/components/Adidas";
import Converse from "../components/HotSale/components/Converse";
import Footer from "../components/footer/Footer";
import AppChat from "../components/AppChat/AppChat";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { useSelector } from "react-redux";

function HomePage(props) {
  const { userInfo } = useSelector((state) => state.userSignin);

  return (
    <div style={{ position: "relative" }}>
      <Header></Header>
      <Carousel></Carousel>
      <Nike></Nike>
      <Carousel2></Carousel2>
      <Adidas></Adidas>
      <Carousel></Carousel>
      <Converse></Converse>
      <Footer></Footer>
      <ScrollToTop></ScrollToTop>
      {userInfo && userInfo.isAdmin === false ? <AppChat></AppChat> : ""}
    </div>
  );
}

export default HomePage;
