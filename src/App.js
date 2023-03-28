// ชินวัตร บูรพา
import React, { useState } from "react"
import "./App.css"
// import '../src/common/footer/Footer.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import Login from "./old_fontend/Login"
import Register from "./old_fontend/Register"
import Detailproduct from "./old_fontend/showdetail"
import Logins from "./Component-Admin/Login"
import Product from "./Component-Admin/Product"
import User from "./Component-Admin/User"
import Productcreate from "./Component-Admin/Create"
import ProductUpe from "./Component-Admin/Updateproduct"
import Navbars from "./Component-Admin/Navbar"
import UserUpe from "./Component-Admin/Updateuser"
function App() {

  const { productItems } = Data
  const { shopItems } = Sdata


  const [CartItem, setCartItem] = useState([])


  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
     
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }


  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)

   
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }
  
  return (
    <>
      <Router>
          <Route path='/' exact>
            <Header CartItem={CartItem} />
            <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
            <Footer />
          </Route>
        <Switch>
          <Route path='/Login' exact >
            <Login Login={Login} />
          </Route>
          <Route path='/Register' exact >
            <Register Register={Register} />
          </Route>
          <Route path='/Detailproduct' exact >
            <Detailproduct Detailproduct={Detailproduct} />
          </Route>
          <Route path='/Logins' exact >
            <Logins Logins={Logins} />
          </Route>
          <Route path='/products' exact >
          <Navbars />
            <Product Product={Product} />
          </Route>
          <Route path='/users' exact >
          <Navbars />
            <User User={User} />
          </Route>
          <Route path='/create' exact >
          <Navbars />
            <Productcreate Productcreate={Productcreate} />
          </Route>
          <Route path='/edit/product/:id' exact >
          <Navbars />
            <ProductUpe ProductUpe={ProductUpe} />
            <Route path='/edit/user/:id' exact >
          <Navbars />
            <UserUpe UsertUpe={UserUpe} />
          </Route>
          </Route>
        </Switch>
        <Route path='/cart' exact>
        <Header CartItem={CartItem} />
          <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
        <Footer />
        </Route>
      </Router>
    </>
  )
}

export default App
