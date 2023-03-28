/*ชินวัตร บูรพา fetch ข้อมูลดึงข้อมูลจาก DB มาใช้*/ 

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './CSS/showdetail.css'
function Detailproduct() {
  const [Data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch("https://64005a829f844910298eb65c.mockapi.io/products")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [id]);
  return (
    <div>
      {Data.map((val) => (
        <main className="container">
          <div className="left-column">
            <img className="Img" src={val.images_Products} alt=""/>
          </div>
          <div className="right-column">
          <div className="product-description">
            <h1>{val.ProductName}</h1>
            <h3>{val.groupProduct}</h3>
            <br />
          <h2>{val.price}฿</h2>
           <a href="!#" className="cart-btn">Add to cart</a>
          </div>
          </div>
          </main>
      ))}
    </div>
  );
}

export default Detailproduct;