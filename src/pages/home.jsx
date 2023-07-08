import React from 'react';
import Hero from '../components/hero';
import Product from '../components/product';
import Footer from '../components/footer';
import { useSelector } from 'react-redux';

const Home = () => {
  let {user} = useSelector(state => state.user);
  console.log(user)
  return (
    <div>
      <Hero />
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
          PRODUCTS
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          MOST POPULAR PRODUCTS
        </h1>
      </div>
      <Product />
      <Footer/>
    </div>
  );
};

export default Home;
