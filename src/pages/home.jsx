import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setUserDeatils} from '../redux/actions/userAction';
import Hero from '../components/hero';
import ProductCard from '../components/product';
import Products from '../components/product';
import Footer from '../components/footer';
import Category from '../components/category';

const Home = () => {
  const dispatch = useDispatch();
  // let {products} = useSelector(state => state.getProducts);

  useEffect(() => {
    dispatch(setUserDeatils());
  }, [dispatch]);

  return (
    <div className="mx-auto">
      <div className="px-[5rem]">
        <Hero />
        <Category />
        <div className="flex flex-col text-center w-full mb-20 pt-[6rem]">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            PRODUCTS
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            MOST POPULAR PRODUCTS
          </h1>
        </div>
        <ProductCard />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
