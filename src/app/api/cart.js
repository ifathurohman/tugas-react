import axios from 'axios';
import {config} from '../../utils/config';
import {getToken} from '../../utils/localstorage';

export const saveCart = async (cart) => {
  return await axios.put(
    `${config.api_host}/api/carts`,
    {cart},
    {
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    },
  );
};
