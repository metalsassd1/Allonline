import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Snacks & Chocolate",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Drinks",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Condiments & Canned food",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Health & Beauty",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Household items",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Fresh food & Fruit",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Mother & Child",
    },
    
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Health",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Offerings & Festival products",
    },
   
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (           
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
