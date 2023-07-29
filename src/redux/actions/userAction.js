import {Api} from '../../utils/api';
import * as actionTypes from '../constants/userContants';

export const setUserDeatils = () => async dispatch => {
  const {statusCode, data} = await Api.getRequest(`/auth/me`);
  const user = JSON.parse(data);
  if (statusCode === 400 || statusCode === 500) {
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    });
    return;
  }
  dispatch({
    type: actionTypes.SET_USER,
    payload: {
      isLogin: true,
      details: {...user},
    },
  });
};

export const setInitialState = () => async dispatch => {
  dispatch({
    type: actionTypes.SET_INITIAL_STATE,
  });
};
