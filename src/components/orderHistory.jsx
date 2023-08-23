import {FormatRupiah} from '@arismun/format-rupiah';
import React, {useEffect, useState} from 'react';
import Footer from '../components/footer';
import {getOrders} from '../app/api/order';
import moment from 'moment';
import {config} from '../utils/config';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const OrderHistory = () => {
  const [order, setOrder] = useState();
  const user = useSelector(state => state.user);
  const detailUser = user.userInfo.details;

  const Order = async e => {
    getOrders(10)
      .then(response => {
        setOrder(response.data);
      })
      .catch(e => {
        return e;
      });
  };

  useEffect(() => {
    Order();
  }, []);

  if (order?.count < 1 || detailUser?.error === 1) {
    return (
      <div className=" h-[70vh] flex justify-center items-center text-4xl ">
        Order History Is Empty
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div>
        <div className="w-full mb-20 bg-gray-100">
          <main className="w-full mx-auto py-8 px-4 sm:px-6 lg:pb-24 lg:px-8">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Order history
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Check the status of recent orders, manage returns, and download
                invoices.
              </p>
            </div>

            <section aria-labelledby="recent-heading">
              <h2 id="recent-heading" className="sr-only">
                Recent orders
              </h2>
              {order?.data?.map((order, key) => {
                const payment =
                  JSON.parse(localStorage.getItem('Payment')) || [];
                console.log(payment)
                const found = payment.find(obj => {
                  return obj?.order_id === order?.id;
                });

                let subtotal = order?.order_items.reduce(
                  (total, item) => (total += item.price * item.qty),
                  0,
                );
                return (
                  <div key={key} className="space-y-20 pt-8">
                    <div className="px-10 py-10 shadow-lg bg-white">
                      <div className="bg-gray-50 rounded-lg sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                        <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                          <div className="flex justify-between sm:block">
                            <div className="font-medium text-gray-900">
                              Date placed
                            </div>
                            <div className="sm:mt-1">
                              {moment(order?.createdAt).format('LLLL')}
                            </div>
                          </div>
                          <div className="flex justify-between pt-6 sm:block sm:pt-0">
                            <div className="font-medium text-gray-900">
                              Order number
                            </div>
                            <dd className="sm:mt-1">{order?.id}</dd>
                          </div>
                          <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                            <div>Total amount</div>
                            <dd className="sm:mt-1">
                              <FormatRupiah
                                value={
                                  parseInt(subtotal) +
                                  parseInt(order?.delivery_fee)
                                }
                              />
                            </dd>
                          </div>
                        </dl>
                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                          <div className="font-bold text-gray-900 text-center">
                            <span
                              className={
                                order?.status === 'paid' ||
                                found?.transaction_status === 'settlement'
                                  ? 'text-green-500'
                                  : 'text-yellow-500'
                              }>
                              {order?.status === 'paid' ||
                              found?.transaction_status === 'settlement'
                                ? `Paid - ${moment(
                                    found?.transaction_time,
                                  ).format('LLL')}`
                                : 'Waiting Payment'}
                            </span>
                            <dd className="sm:mt-2">
                              <Link
                                to={`/order/${order?.id}`}
                                className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
                                View Order
                              </Link>
                            </dd>
                            {order?.status === 'paid' ||
                            found?.transaction_status === 'settlement' ? (
                              <dd className="sm:mt-2">
                                <Link
                                  to={`/invoice/${order?.id}`}
                                  className="w-full flex items-center justify-center bg-green-500 mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
                                  View Invoice
                                </Link>
                              </dd>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                      <table className="mt-4 w-full text-gray-500 sm:mt-6">
                        <caption className="sr-only">Products</caption>
                        <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                          <tr>
                            <th
                              scope="col"
                              className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
                              Product
                            </th>
                            <th
                              scope="col"
                              className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">
                              Price
                            </th>
                            <th
                              scope="col"
                              className="hidden pr-8 py-3 font-normal sm:table-cell">
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="w-0 py-3 font-normal text-right">
                              Info
                            </th>
                          </tr>
                        </thead>
                        {order?.order_items?.map((item, key) => {
                          return (
                            <tbody
                              key={key}
                              className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                              <tr>
                                <td className="py-6 pr-8">
                                  <div className="flex items-center">
                                    <img
                                      src={
                                        config.api_host +
                                        '/images/products/' +
                                        item?.image_url
                                      }
                                      alt={item?.name}
                                      className="w-16 h-16 object-center object-cover rounded mr-6"
                                    />
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {item?.name}
                                      </div>
                                      <div className="mt-1 sm:hidden">
                                        <FormatRupiah value={item?.price} />
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="hidden py-6 pr-8 sm:table-cell">
                                  <FormatRupiah value={item?.price} />
                                </td>
                                <td className="hidden py-6 pr-8 sm:table-cell">
                                  {item?.qty}
                                </td>
                                <td className="py-6 font-medium text-right whitespace-nowrap">
                                  <Link
                                    to={`/product/${item?.name}`}
                                    className="text-indigo-600">
                                    View Product
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                );
              })}
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
