import React from 'react';

const Promo = () => {
  return (
    <div>
      <div class="bg-white relative overflow-hidden">
        <div aria-hidden="true" class="absolute inset-0">
          <div class="absolute inset-0 max-w-7xl mx-auto overflow-hidden xl:px-8">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
              alt=""
              class="w-full h-full object-center object-cover"
            />
          </div>
          <div class="absolute inset-0 bg-white bg-opacity-75"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-white via-white"></div>
        </div>

        <section
          aria-labelledby="sale-heading"
          class="relative max-w-7xl mx-auto pt-32 px-4 flex flex-col items-center text-center sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto lg:max-w-none">
            <h2
              id="sale-heading"
              class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Get 25% off during our one-time sale
            </h2>
            <p class="mt-4 max-w-xl mx-auto text-xl text-gray-600">
              Most of our products are limited releases that won't come back.
              Get your favorite items while they're in stock.
            </p>
            <a
              href="#"
              class="mt-6 inline-block w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto">
              Get access to our one-time sale
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Promo;
