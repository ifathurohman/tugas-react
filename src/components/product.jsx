import {useEffect, useState} from 'react';
import {FormatRupiah} from '@arismun/format-rupiah';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts as listProducts} from '../redux/actions/productActions';
import {config} from '../utils/config';
import {Link} from 'react-router-dom';

const Product = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts);
  const {products, loading, error} = getProducts;
  
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="lg:w-[22%] md:w-1/2 w-full mx-5 my-5 border border-opacity-50 rounded-lg shadow-lg bg-gray-100 cursor-pointer">
                <Link
                  to={`/product/${product.name}`}
                  className="block relative h-72 rounded-t-lg overflow-hidden">
                  <img
                    alt={product.name}
                    className="object-unset object-center w-full h-full block"
                    src={
                      config.api_host + '/images/products/' + product.image_url
                    }
                  />
                </Link>
                <div className="mt-4 mb-4 px-[1rem] items-start">
                  <span className="inline-block py-1 px-2 rounded bg-indigo-200 text-indigo-500 text-xs font-medium tracking-widest">
                    {product.category.name}
                  </span>
                  <h2 className="sm:text-2xl text-xl title-font font-thin text-gray-900 mt-4 mb-4">
                    {product.name}
                  </h2>
                  <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                    <div className="text-gray-900 title-font text-xl font-bold">
                      <FormatRupiah value={product.price} />
                    </div>
                    <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Product;
