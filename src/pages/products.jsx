import React, {useEffect, useState} from 'react';
import Category from '../components/category';
import Product from '../components/product';
import Footer from '../components/footer';

const Products = () => {
  return (
    <div className="mx-auto">
      <div className="px-[5rem] pt-[8rem]">
        <Category />
        <div className="flex flex-col text-center w-full mt-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            PRODUCTS
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            ALL PRODUCTS
          </h1>
        </div>
        <Product />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
