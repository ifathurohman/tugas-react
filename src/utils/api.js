import {config} from './config';
import {getToken} from './localstorage';

const getRequest = async path => {
  try {
    const params = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    };
    const res = await fetch(config.api_host + path, params);
    const data = await res.text();
    return {statusCode: res.status, data};
  } catch (e) {
    console.error(`error in get Request (${path}) :- `, e);
    return {statusCode: 400, data: []};
  }
};

const postRequest = async (path, body) => {
  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.api_host + path, params);
    // console.log(res)

    const data = await res.text();
    // console.log({data})
    return {statusCode: res.status, data};
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};

const DeleteRequest = async path => {
  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    };

    const res = await fetch(config.api_host + path, params);

    const data = await res.text();
    return {statusCode: res.status, data};
  } catch (e) {
    console.log(`error in Delete Request (${path}) :- `, e);
  }
};

const putRequest = async (path, body) => {
  try {
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.api_host + path, params);

    const data = await res.text();
    return {statusCode: res.status, data};
  } catch (e) {
    console.log(`error in PUT Request (${path}) :- `, e);
  }
};

const putRequestCart = async (path, body) => {
  try {
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.api_host + path, params);

    const data = await res.text();
    return {statusCode: res.status, data};
  } catch (e) {
    console.log(`error in PUT Request (${path}) :- `, e);
  }
};

const getProduct = async path => {
  try {
    const params = {
      method: 'GET',
    };
    const res = await fetch(config.api_host + path, params);
    const data = await res.text();
    return {statusCode: res.status, data};
  } catch (e) {
    console.error(`error in get Request (${path}) :- `, e);
    return {statusCode: 400, data: []};
  }
};

const postCourier = async (path, body) => {
  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        key: config.raja_ongkir_key,
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(path, params);
    // console.log(res)

    const data = await res.text();
    // console.log({data})
    return {statusCode: res.status, data};
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};

export const Api = {
  getRequest,
  postRequest,
  DeleteRequest,
  putRequest,
  putRequestCart,
  getProduct,
  postCourier,
};
