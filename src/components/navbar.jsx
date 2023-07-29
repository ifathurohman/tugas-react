import React, {useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AiOutlineSearch} from 'react-icons/ai';
import {setInitialState} from '../redux/actions/userAction.js';
import {logoutUser} from '../app/api/auth';
import {config} from '../utils/config';
import {getToken} from '../utils/localstorage.js';

const Navbar = () => {
  const token_key = config.secret_key;
  let token = window.localStorage.getItem(token_key);
  let fromToken = token === getToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [search, setSearch] = useState('');
  const carts = JSON.parse(localStorage.getItem('cart')) || [];
  const [isOpen, setIsOpen] = useState(false);
  const dispatchHandler = () => {
    if (!isOpen) {
      dispatch({type: 'DRAWER', payload: true});
      setIsOpen(true);
    } else {
      dispatch({type: 'DRAWER', payload: false});
      setIsOpen(false);
    }
  };
  const handleLogout = e => {
    e.preventDefault();
    logoutUser();
    dispatch(setInitialState());
    navigate('/login');
  };

  return (
    <header className="text-gray-600 body-font shadow-lg w-screen fixed bg-white z-40">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={'/'}
          className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
            viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link to={'/'} className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link to={'/product'} className="mr-5 hover:text-gray-900">
            Product
          </Link>
          <a className="mr-5 hover:text-gray-900">Second Link</a>
        </nav>
        {/* Search */}
        <div className="md:flex mr-4 ml-12">
          <AiOutlineSearch className="absolute mt-2 ml-2" />
          <input
            // value={search}
            // onKeyDown={searchPost}
            // onChange={e => setSearch(e.target.value)}
            className="shadow appearance-none border border-gray-400 dark:border-gray-500 rounded-lg w-full py-[5px] px-3 leading-tight focus:outline-none focus:shadow-outline bg-custom-white dark:bg-custom-dark dark:shadow-gray-700 pl-8 "
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="hidden xl:flex items-center space-x-5 ">
          {/* Heart */}
          <a className="hover:text-red-600" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </a>
          {/* Shopping Cart */}
          <a
            className="flex items-center hover:text-gray-600 cursor-pointer"
            onClick={() => dispatchHandler()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {carts.length === 0 ? (
              <span className="flex absolute -mt-5 ml-4"></span>
            ) : (
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500 justify-center">
                  <span className="text-white self-center text-[10px] font-bold">
                    {carts?.length}
                  </span>
                </span>
              </span>
            )}
          </a>
          {/* User */}
          <div>
            <div className="items-center">
              <button className="peer relative block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-600 dark:hover:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              {fromToken === true ? (
                <div className="hidden peer-hover:flex hover:flex absolute right-4 bg-white dark:bg-custom-dark-second min-w-[160px] shadow-xl z-10 rounded-lg ">
                  <div className="flex flex-col text-center w-full">
                    <div className="my-2">
                      <h1 className="text-center">
                        {user.userInfo.details.email}
                      </h1>
                    </div>
                    <NavLink
                      to="/user"
                      className={'hover:bg-gray-200 dark:hover:bg-gray-400'}>
                      <button className=" py-4 rounded-lg">Settings</button>
                    </NavLink>
                    <button
                      className="py-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-400"
                      onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="hidden peer-hover:flex hover:flex absolute right-4 bg-white dark:bg-white-700 min-w-[160px] shadow-xl z-10 rounded-lg ">
                  <div className="flex flex-col text-center w-full">
                    <NavLink
                      to="/login"
                      className={
                        'hover:bg-orange-200 dark:hover:bg-orange-200'
                      }>
                      <button className=" py-4 rounded-lg">Sign In</button>
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className={
                        'hover:bg-orange-200 dark:hover:bg-orange-200'
                      }>
                      <button className="py-4 rounded-lg ">Sign Up</button>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/*Shopping Cart Responsive*/}
      <a
        className="xl:hidden flex mr-6 items-center cursor-pointer"
        onClick={() => dispatchHandler()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {carts && carts?.length <= 0 ? (
          <span className="flex absolute -mt-5 ml-4"></span>
        ) : (
          <span className="flex absolute -mt-5 ml-4">
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 justify-center">
              <span className="text-white self-center text-[8px]">
                {carts?.length}
              </span>
            </span>
          </span>
        )}
      </a>
      {/*Responsive Menu Icon*/}
      <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </a>
    </header>
  );
};

export default Navbar;
