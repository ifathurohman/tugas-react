import React from 'react';

const Category = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="text-start sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Pitchfork Kickstarter Taxidermy
            </h1>
            <div className="h-1 w-20 bg-yellow-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom prism
            food truck ugh squid celiac humblebrag.
          </p>
        </div>
        <div className="bg-white">
          <div className="py-16 sm:py-24 xl:mx-auto">
            <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                SHOP BY CATEGORY
              </h2>
              <a
                href="#"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                Browse all categories<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-4 flow-root">
              <div className="-my-2">
                <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                  <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                    <a
                      href="#"
                      className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto">
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"></span>
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        New Arrivals
                      </span>
                    </a>

                    <a
                      href="#"
                      className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto">
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"></span>
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        Productivity
                      </span>
                    </a>

                    <a
                      href="#"
                      className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto">
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"></span>
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        Workspace
                      </span>
                    </a>

                    <a
                      href="#"
                      className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto">
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"></span>
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        Accessories
                      </span>
                    </a>

                    <a
                      href="#"
                      className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto">
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"></span>
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        Sale
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 px-4 sm:hidden">
              <a
                href="#"
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                Browse all categories<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
