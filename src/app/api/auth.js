import axios from 'axios';
import {config} from '../../utils/config';
import {getToken} from '../../utils/localstorage';

export const registerUser = async data => {
  return await axios.post(`${config.api_host}/auth/register`, data);
};

export const loginUser = async data => {
  return await axios.post(`${config.api_host}/auth/login`, data);
};

export const logoutUser = async () => {
  const token_key = config.secret_key;
  let token = window.localStorage.getItem(token_key);
  localStorage.removeItem(token_key);

  return await axios.post(`${config.api_host}/auth/logout`, null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
