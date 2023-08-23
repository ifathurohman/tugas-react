import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {Api} from '../api';
import {logout} from '../localstorage';

function useLogin() {
  const [loginInfo, setLoginInfo] = useState({
    loading: true,
    isLogin: false,
  });
  const navigate = useNavigate();
  const checkLogin = useCallback(async () => {
    const {statusCode, data} = await Api.getRequest(`/auth/me`);
    console.log({statusCode, data});
    if (statusCode === 401 || statusCode === 200) {
      // navigate('/');
      logout();
      return;
    } else {
      setLoginInfo({loading: false, isLogin: true});
    }
  }, []);
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);
  return {loginInfo};
}

export default useLogin;
