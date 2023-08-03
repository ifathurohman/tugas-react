import React, {useEffect, useState} from 'react';
import Footer from './footer';
import {FormatRupiah} from '@arismun/format-rupiah';
import {getOrdersDetail} from '../app/api/order';
import {useParams} from 'react-router-dom';
import {config} from '../utils/config';
import {useSelector} from 'react-redux';
import {Ripple, initTE} from 'tw-elements';
import moment from 'moment';

const OrderDetail = () => {
  const id = useParams();
  const user = useSelector(state => state.user);
  const detailUser = user.userInfo.details;

  const [orderDetail, setOrderDetail] = useState();
  let subtotal = orderDetail?.order_items.reduce(
    (total, item) => (total += item.price * item.qty),
    0,
  );

  const Detail = async e => {
    getOrdersDetail(id.id)
      .then(response => {
        setOrderDetail(response.data.orderDetail);
        console.log(response.data.orderDetail);
      })
      .catch(e => {
        return e;
      });
  };

  useEffect(() => {
    initTE({Ripple});
    Detail();
  }, []);

  return (
    <div>
      <div className="h-screen grid grid-cols-3">
        <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
          <div
            className={
              orderDetail?.status === 'waiting_payment'
                ? 'mt-[7rem] p-4 relative flex flex-col sm:flex-row sm:items-center bg-yellow-200 shadow rounded-md'
                : 'mt-[7rem] p-4 relative flex flex-col sm:flex-row sm:items-center bg-green-200 shadow rounded-md'
            }>
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div
                className={
                  orderDetail?.status === 'waiting_payment'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div
              className={
                orderDetail?.status === 'waiting_payment'
                  ? 'text-md font-semibold tracking-wide text-yellow-600 mt-4 sm:mt-0 sm:ml-4'
                  : 'text-md font-semibold tracking-wide text-green-600 mt-4 sm:mt-0 sm:ml-4'
              }>
              {orderDetail?.status === 'waiting_payment'
                ? 'Waiting Payment'
                : 'Paid'}
            </div>
          </div>
          <div className="block w-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div dir="rtl">
              <div className="p-5 absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
                  viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {detailUser?.full_name}
              </h5>
              <p className="text-base text-neutral-600 dark:text-neutral-200">
                {detailUser?.email}
              </p>
              <p className="text-base text-neutral-600 dark:text-neutral-200">
                {moment(orderDetail?.createdAt).format('LLLL')}
              </p>
            </div>
            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 mx-auto">
                <div className="flex flex-wrap -m-12">
                  <div className="p-12 md:w-1/2 flex flex-col items-start mb-4">
                    <h5 className="text-xl title-font font-medium text-gray-900 mt-4 mb-4">
                      Shipping Service
                    </h5>
                    <span className="leading-relaxed">
                      Service : {orderDetail?.shipping_service?.service}
                    </span>
                    <span className="leading-relaxed">
                      Description : {orderDetail?.shipping_service?.description}
                    </span>
                    <span className="leading-relaxed">
                      Estimated : {orderDetail?.shipping_service?.etd}
                    </span>
                  </div>
                  <div className="p-12 md:w-1/2 flex flex-col items-start">
                    <h5 className="text-xl title-font font-medium text-gray-900 mt-4 mb-4">
                      Delivery Address
                    </h5>
                    <span className="leading-relaxed">
                      {orderDetail?.delivery_address?.detail}
                    </span>
                    <span className="leading-relaxed">
                      {orderDetail?.delivery_address?.provinsi}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <button className="submit-button px-4 py-3 rounded-md bg-yellow-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
            <div className="">
              <span className="mr-1">PAY</span>
              <span className="text-md">
                (
                <FormatRupiah
                  value={
                    parseInt(subtotal) + parseInt(orderDetail?.delivery_fee)
                  }
                />
                )
              </span>
            </div>
          </button>
        </div>
        <div className="col-span-1 bg-white lg:block hidden mt-[5rem]">
          <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Detail
          </h1>
          <ul className="py-6 border-b space-y-6 px-8">
            {orderDetail?.order_items?.map((item, key) => {
              return (
                <li key={key} className="grid grid-cols-6 gap-2 border-b-1">
                  <div className="col-span-1 self-center">
                    <img
                      src={
                        config.api_host + '/images/products/' + item?.image_url
                      }
                      alt={item?.name}
                      className="rounded w-full"
                    />
                  </div>
                  <div className="flex flex-col col-span-2 pt-2">
                    <span className="text-gray-600 text-md font-semi-bold">
                      {item.name}
                    </span>
                  </div>
                  <div className="col-span-3 pt-3">
                    <div className="flex items-center space-x-2 text-sm justify-between">
                      <span className="text-gray-400">
                        {item.qty} x <FormatRupiah value={item.price} />
                      </span>
                      <span className="text-yellow-400 font-semibold inline-block">
                        <FormatRupiah
                          value={parseInt(item.qty) * parseInt(item.price)}
                        />
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="px-8 border-b">
            <div className="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-yellow-500">
                <FormatRupiah value={subtotal} />
              </span>
            </div>
            <div className="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-yellow-500">
                <FormatRupiah value={orderDetail?.delivery_fee} />
              </span>
            </div>
          </div>
          <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>
              <FormatRupiah
                value={parseInt(subtotal) + parseInt(orderDetail?.delivery_fee)}
              />
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;
