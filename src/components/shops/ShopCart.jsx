/*ชินวัตร บูรพา fetch ข้อมูลจาก DB มาใช้ในหน้า frontend ที่เพื่อนเขียนไว้*/ 
//พงษ์วัตร คนคล่อง
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShopCart = ({ shopItems, addToCart }) => {
  const [Data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getdata = () => {
    axios
      .get("https://64005a829f844910298eb65c.mockapi.io/products")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 10);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {currentItems.map((val) => {
        return (
          <div className="box" key={val.productCode}>
            <Link to={"/Detailproduct/" + val.productCode}>
              <div className="product mtop">
                <div className="img">
                  <span className="discount">{val.discount}FLASH SALE</span>
                  <img src={val.images_Products} alt="" />
                  <div className="product-like">
                    <label>{count}</label> <br />
                    <i className="fa-regular fa-heart" onClick={increment}></i>
                  </div>
                </div>
                <div className="product-details">
                  <h3>{val.ProductName}</h3>
                  <div className="price">
                    <h4>{val.price}฿</h4>
                    <button onClick={() => addToCart(shopItems)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
      <div className="pagination1">
        {pageNumbers.map((number) => (
          <span
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active1" : ""}
          >
            {number}
          </span>
        ))}
      </div>
    </>
  );
};

export default ShopCart;


