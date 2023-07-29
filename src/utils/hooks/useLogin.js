import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {Api} from '../api';
import {logout} from '../localstorage';

function useLogin() {
  const [loginInfo, setLoginInfo] = useState({
    loading: true,
    isLogin: false,
  });
  const {replace} = useNavigate();
  const checkLogin = useCallback(async () => {
    const {statusCode, data} = await Api.getRequest(`/auth/me`);
    // console.log({statusCode, data})
    if (statusCode === 400 || statusCode === 500) {
      replace('/');
      logout();
      return;
    }
    setLoginInfo({loading: false, isLogin: true});
  }, [replace]);
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);
  return {loginInfo};
}

export default useLogin;
