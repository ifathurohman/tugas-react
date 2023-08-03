import axios from 'axios';
import {config} from '../../utils/config';
import {getToken} from '../../utils/localstorage';

export const createOrder = async payload => {
  return await axios.post(`${config.api_host}/api/orders`, payload, {
    headers: {
      authorization: 'Bearer ' + getToken(),
    },
  });
};

export async function getInvoiceByOrderId(order_id) {
  return await axios.get(`${config.api_host}/api/invoices/${order_id}`, {
    headers: {
      authorization: 'Bearer ' + getToken(),
    },
  });
}

export async function getOrders(limit) {
  return await axios.get(`${config.api_host}/api/orders?limit=${limit}`, {
    headers: {authorization: 'Bearer ' + getToken()},
  });
}

export async function getOrdersDetail(id) {
  return await axios.get(`${config.api_host}/api/orders?order=${id}`, {
    headers: {authorization: 'Bearer ' + getToken()},
  });
}
