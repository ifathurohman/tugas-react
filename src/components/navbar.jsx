import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font shadow-lg w-screen fixed bg-white z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
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
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">First Link</a>
          <a className="mr-5 hover:text-gray-900">Second Link</a>
          <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="mr-5 hover:text-gray-900">Fourth Link</a>
        </nav>
        <NavLink to="/login">
          <button className="inline-flex items-center text-white bg-slate-500 border-0 py-2 px-4 mr-2 focus:outline-none hover:bg-slate-700 rounded text-base mt-4 md:mt-0">
            Sign In
          </button>
        </NavLink>
        <NavLink to="/signup">
          <button className="inline-flex items-center text-white bg-slate-700 border-0 py-2 px-4 focus:outline-none hover:bg-slate-900 rounded text-base mt-4 md:mt-0">
            Sign Up
          </button>
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar