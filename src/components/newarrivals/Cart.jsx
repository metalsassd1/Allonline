/*ชินวัตร บูรพา*/ 

// import Ndata from "./Ndata"
import React, { useState ,useEffect } from "react"
import axios from 'axios';

const Cart = () => {
  const [Data, setData] = useState([])
const getdata  = () =>{
axios.get('https://64005a829f844910298eb65c.mockapi.io/products')
  .then(response => {
    setData(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}
useEffect (()=>{
  getdata ()
},[])
  return (
    <>
      <div className='content grid product'>
        {Data.map((val, index) => {
          return (
            <div className='box' key={index}>
              <div className='img'>
                <img src={val.images_Products} alt='' />
              </div>
              <h3>{val.ProductName}</h3>
              <span>{val.price}฿</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Cart
