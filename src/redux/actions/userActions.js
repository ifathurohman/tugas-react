import { loginUser } from '../../app/api/auth';
import * as actionTypes from '../constants/userConstant.js';

export const setUserDeatils = () => async dispatch => {
  const {statusCode, data} = loginUser;
  // console.log({statusCode, data})
  if (statusCode === 400 || statusCode === 500) {
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    });
    return;
  }
  const {user} = JSON.parse(data);
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