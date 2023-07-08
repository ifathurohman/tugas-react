import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../app/api/auth';
import {userLogin} from '../app/features/auth/actions';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ok, setOK] = useState('');
  let {auth} = useSelector(state => state.auth);
  console.log(auth);
  const dispatch = useDispatch();
  const onLogin = e => {
    e.preventDefault();
    loginUser({email, password})
      .then(response => {
        const successMessage = response.data.message;
        if (successMessage === 'Login Successfully') {
          setOK(successMessage);
          console.log(response.data);
          dispatch(userLogin(response.data));
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      })
      .catch(e => {
        const errorMessage = e.response.data.message;
        setError(errorMessage);
      });
  };

  return (
    <div>
      <section className="bg-custom-white dark:bg-custom-dark">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-custom-dark dark:border-gray-600">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                Login your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                {error ? (
                  <div
                    className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
                    role="alert">
                    <p className="font-bold">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                ) : (
                  <div></div>
                )}
                {ok ? (
                  <div
                    className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3"
                    role="alert">
                    <p className="font-bold">OK</p>
                    <p className="text-sm">{ok}</p>
                  </div>
                ) : (
                  <div></div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-black">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-black bg-custom-green hover:bg-custom-dark-green focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={onLogin}>
                  Sign In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do you already have an account?{' '}
                  <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    <NavLink to="/signup">Sign up</NavLink>
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
