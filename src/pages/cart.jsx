import React, {useEffect, useState} from 'react';
import {FormatRupiah} from '@arismun/format-rupiah';
import {Link, useNavigate} from 'react-router-dom';
import useLogin from '../utils/hooks/useLogin';
import {config} from '../utils/config';
import {useSelector} from 'react-redux';
import {saveCart} from '../app/api/cart';
import Footer from '../components/footer';
import DeliveryAddress from '../components/delivery';
import axios, {Axios} from 'axios';

import {Select, initTE} from 'tw-elements';
import {createOrder} from '../app/api/order';
import {getAddress} from '../app/api/address';

const Cart = () => {
  const navigate = useNavigate();

  const [cellValue, setCellValue] = useState();

  const [total, setTotal] = useState(0);

  const options = [
    {value: 'jne', text: 'JNE'},
    {value: 'pos', text: 'POS'},
    {value: 'tiki', text: 'TIKI'},
  ];

  const [selected, setSelected] = useState(options[0].value);

  const [shipping, setShipping] = useState([]);

  const carts = JSON.parse(localStorage.getItem('cart')) || [];
  const address = JSON.parse(localStorage.getItem('shipping')) || [];

  const user = useSelector(state => state.user);

  const [activeBox, setActiveBox] = useState(null);
  const [deliveryCost, setdeliveryCost] = useState(0);

  const totalPayment = parseInt(total) + parseInt(deliveryCost);

  const active =
    'bg-yellow-200 border-b transition duration-300 ease-in-out hover:bg-yellow-200 dark:border-neutral-500 dark:hover:bg-neutral-600 cursor-pointer border-solid border-2 border-gray font-semibold';
  const inactive =
    'border-b transition duration-300 ease-in-out hover:bg-yellow-200 dark:border-neutral-500 dark:hover:bg-neutral-600 cursor-pointer';

  useEffect(() => {
    initTE({Select});
    const total = carts.reduce((acc, item) => {
      return acc + item?.price * item?.qty;
    }, 0);
    setTotal(total);
    fetchDataAddress();
  }, [carts]);

  const handleInc = id => {
    const updatedCart = carts.map(item => {
      if (item?._id === id) {
        return {
          ...item,
          qty: item?.qty + 1,
        };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    saveCart(updatedCart);
    navigate('/cart');
  };

  const handleDec = id => {
    const updatedCart = carts.map(item => {
      if (item?._id === id) {
        if (item?.qty > 1) {
          return {
            ...item,
            qty: item?.qty - 1,
          };
        }
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    saveCart(updatedCart);
    navigate('/cart');
  };

  const removeProduct = id => {
    const updatedCart = carts.filter(item => item?._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    saveCart(updatedCart);
    navigate('/cart');
  };

  const changeHandleShipping = async e => {
    setSelected(e.target.value);

    console.log(address);

    const dataCost = {
      origin: '151',
      weight: '1000',
      destination: address[0].id_kabupatenTag,
      courier: e.target.value,
      key: `${config.raja_ongkir_key}`,
    };

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    await axios
      .post('http://api.rajaongkir.com/starter/cost', dataCost, {
        headers: headers,
      })
      .then(response => {
        setShipping([response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getCellValue = e => {
    setCellValue(e.currentTarget.dataset);
    setdeliveryCost(e.currentTarget.dataset.costTag);
    setActiveBox(e.currentTarget.getAttribute('data-key'));
  };

  const fetchDataAddress = async e => {
    getAddress(10)
      .then(response => {
        console(response.data);
      })
      .catch(e => {
        return e;
      });
  };

  const handleCreateOrder = async () => {
    const dataService = {
      costTag: cellValue.costTag,
      descriptionTag: cellValue.descriptionTag,
      etdTag: cellValue.etdTag,
      key: cellValue.key,
      serviceTag: cellValue.serviceTag,
    };

    console.log(dataService);

    let payload = {
      delivery_address: address[0].id,
      delivery_fee: deliveryCost,
      shipping_service: dataService,
    };

    createOrder(payload)
      .then(response => {
        console.log(response);
        localStorage.setItem('cart', JSON.stringify([]));
        navigate(`/order/${response.data._id}`);
      })
      .catch(e => {
        return e;
      });
  };

  if (carts.length === 0) {
    return (
      <div className=" h-[100vh] flex justify-center items-center text-4xl ">
        Cart is Empty
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="flex shadow-md">
        <div className="w-3/4 bg-white px-10 py-10 mt-[1rem]">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{carts?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {carts?.map((cart, index) => {
            return (
              <div
                key={index}
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="flex-shrink-0">
                    <img
                      className="w-16 h-16 rounded-md"
                      src={
                        config.api_host + '/images/products/' + cart?.image_url
                      }
                      alt={cart?.name}
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{cart?.name}</span>
                    <span className="text-red-500 text-xs capitalize">
                      {cart?.category?.name}
                    </span>
                    <div
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                      onClick={() => removeProduct(cart?._id)}>
                      Remove
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={() => handleDec(cart?._id)}>
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>

                  <input
                    className="mx-2 border text-center w-12"
                    type="text"
                    value={cart?.qty}
                    onChange={e => handleChange(e)}
                  />

                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    onClick={() => handleInc(cart?._id)}
                    viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  <FormatRupiah value={cart?.price} />
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  <FormatRupiah value={cart?.price * cart?.qty} />
                </span>
              </div>
            );
          })}
          <Link
            to={'/product'}
            className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10 mt-[1rem]">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {carts?.length}
            </span>
            <span className="font-semibold text-sm">
              <FormatRupiah value={total?.toFixed(2)} />
            </span>
          </div>
          <DeliveryAddress />
          <div>
            <label className="font-medium inline-block mt-5 mb-5 text-sm uppercase">
              Shipping
            </label>
            <select
              data-te-select-init
              data-te-select-size="lg"
              value={selected}
              onChange={changeHandleShipping}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
          <div className="inline-block mt-5 mb-5">
            {shipping.map((shipping, index) => {
              return (
                <div key={index}>
                  <label className="font-medium inline-block mt-5 mb-5 text-sm uppercase">
                    {shipping.rajaongkir.results[0].name}
                  </label>
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full py-2">
                        <div className="overflow-hidden">
                          <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                              <tr>
                                <th
                                  scope="col"
                                  colSpan="3"
                                  className="px-4 py-4">
                                  Service
                                </th>
                              </tr>
                            </thead>
                            <tbody className="min-w-full">
                              {shipping.rajaongkir.results[0].costs.map(
                                (shippingCost, indexCost) => {
                                  return (
                                    <tr
                                      key={indexCost}
                                      onClick={getCellValue}
                                      className={
                                        activeBox == indexCost
                                          ? active
                                          : inactive
                                      }
                                      data-key={indexCost}
                                      data-service-tag={shippingCost?.service}
                                      data-description-tag={
                                        shippingCost?.description
                                      }
                                      data-cost-tag={
                                        shippingCost?.cost[0].value
                                      }
                                      data-etd-tag={shippingCost?.cost[0].etd}>
                                      <td className="whitespace-nowrap px-4 py-4 font-medium">
                                        {shippingCost?.service}
                                        <br />
                                        <span className="italic font-thin">
                                          {shippingCost?.description}
                                        </span>
                                      </td>
                                      <td className="whitespace-nowrap px-4 py-4">
                                        <br />
                                        <FormatRupiah
                                          value={shippingCost?.cost[0].value}
                                        />
                                      </td>
                                      <td className="whitespace-nowrap px-4 py-4">
                                        <br />
                                        {shippingCost?.cost[0].etd}
                                      </td>
                                    </tr>
                                  );
                                },
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t mt-5">
            {activeBox === null ? (
              <div className="hidden">
                <span>Delivery Cost</span>
                <span>
                  <FormatRupiah value={parseInt(deliveryCost).toFixed(2)} />
                </span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between py-3 text-sm">
                  <span>Delivery Cost</span>
                  <span>
                    <FormatRupiah value={parseInt(deliveryCost).toFixed(2)} />
                  </span>
                </div>
              </div>
            )}
            <div className="flex font-semibold justify-between py-3 text-lg">
              <span>Total</span>
              <span>
                <FormatRupiah
                  value={(activeBox === null ? total : totalPayment).toFixed(2)}
                />
              </span>
            </div>
            <button
              onClick={handleCreateOrder}
              className="mt-5 bg-yellow-500 font-semibold rounded-md hover:bg-yellow-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
