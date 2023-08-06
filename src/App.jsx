import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import ProductDetail from './components/productDetail';
import Products from './pages/products';
import Home from './pages/home';
import NotFound from './pages/notfound';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Cart from './pages/cart';
import ToogleCart from './components/tooglecart';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDeatils} from './redux/actions/userAction';
import DeliveryAddress from './components/delivery';
import OrderDetail from './components/order';
import OrderHistory from './components/orderHistory';
import Banner from './components/banner';
import Invoice from './components/invoice';

function App() {
  const dispatch = useDispatch();
  const {drawer} = useSelector(state => state.drawer);
  
  useEffect(() => {
    dispatch(setUserDeatils());
  }, [dispatch]);

  return (
    <Router>
      <Navbar/>
      <Banner/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:q" element={<ProductDetail />} />
        <Route path="/product" element={<Products />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<DeliveryAddress />} />
        <Route path="/order" element={<OrderHistory />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {drawer && <ToogleCart />}
    </Router>
  );
}

export default App;
