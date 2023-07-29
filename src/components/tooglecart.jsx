import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {config} from '../utils/config';
import {FormatRupiah} from '@arismun/format-rupiah';

function ToogleCart() {
  const dispatch = useDispatch();

  const carts = JSON.parse(localStorage.getItem('cart')) || [];

  let subtotal = 0;
  carts.map(product => {
    subtotal += product?.qty * product?.price;
  });
  
  return (
    <div>
      <div className="fixed w-3/4 max-w-md p-4 border rounded-lg shadow sm:p-8 right-2 top-24 bg-white text-custom-dark dark:text-custom-white dark:bg-custom-dark overflow-y-auto h-4/6 z-40">
        <div className="flex items-center justify-between mb-4 ">
          <h5 className="text-xl font-bold leading-none select-none">
            Shopping Cart
          </h5>
          <div className="flex">
            <a
              href="/cart"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 mr-4">
              View all
            </a>
            <a className="self-center cursor-pointer">
              <AiOutlineClose
                onClick={() => dispatch({type: 'DRAWER', payload: false})}
              />
            </a>
          </div>
        </div>

        {carts.map((cart, i) => (
          <div className="flow-root" key={i}>
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-800">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-16 h-16 bg-black"
                      src={
                        config.api_host + '/images/products/' + cart?.image_url
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg truncate font-medium ">
                      {cart?.name}
                    </p>
                    <p className="text-sm truncate text-gray-400 ">
                      {cart?.category?.name}
                    </p>
                    <p className="text-sm text-gray-400 ">
                      Quantity: {cart?.qty}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold ">
                    <div>
                      <FormatRupiah value={cart?.price} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))}
        <div className="border-t border-gray-200 px-4 py-6 sm:px-1">
          <div className="flex justify-between text-xl font-bold text-yellow-500 dark:text-custom-white">
            <p>Subtotal</p>
            <p>
              <FormatRupiah value={subtotal.toFixed(2)} />
            </p>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center text-white rounded-md border border-transparent bg-yellow-500 px-6 py-3 text-base font-medium text-custom-dark shadow-sm hover:bg-custom-dark-green">
              CHECKOUT
            </a>
          </div>
          <div className="mt-2 flex justify-center text-center text-sm text-gray-500 flex-col">
            <p> or</p>
            <p>
              <button
                type="button"
                className="font-semibold text-indigo-600 hover:text-indigo-700 mt-2"
                onClick={() => dispatch({type: 'DRAWER', payload: false})}>
                Continue Shopping
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToogleCart;
