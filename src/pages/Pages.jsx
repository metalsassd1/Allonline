import React from "react"
import Home from "../components/MainPage/Home"
import NewArrivals from "../components/newarrivals/NewArrivals"
import Shop from "../components/shops/Shop"
import Annocument from "../components/annocument/Annocument"
import Wrapper from "../components/wrapper/Wrapper"
/*ชินวัตร บูรพา scrollTotop*/ 
import ScrollToTop from "react-scroll-to-top";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  
  return (
    <>
      <Home CartItem={CartItem} />
      <NewArrivals />
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Annocument />
      <Wrapper />
      <ScrollToTop smooth />
    </>
  )
}

export default Pages
