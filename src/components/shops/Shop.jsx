import React from "react"
import Catg from "./Catg"
import ShopCart from "./ShopCart"
import "./style.css"

const Shop = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Catg/>

          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <img src='https://cdn.pixabay.com/photo/2012/04/11/12/37/lightning-28003_960_720.png' />
              <h2>FLASH SALE </h2>
              </div>
              <div className='heading-right row '>
                {/* <span>View all</span>
                <i className='fa-solid fa-caret-right'></i> */}
              </div>
            </div>
            <div className='product-content  grid1'>
              <ShopCart addToCart={addToCart} shopItems={shopItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop
