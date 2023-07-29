import {config} from '../../utils/config';
import axios from 'axios';
import {getToken} from '../../utils/localstorage';

export const getAddress = async limit => {
  return await axios.get(
    `${config.api_host}/api/delivery-address?limit=${limit}`,
    {
      headers: {
        authorization: 'Bearer ' + getToken(),
      },
    },
  );
};

export const createAddress = async data => {
  return await axios.post(`${config.api_host}/api/delivery-address`, data, {
    headers: {
      authorization: 'Bearer ' + getToken(),
    },
  });
};
