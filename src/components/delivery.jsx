import axios from 'axios';
import {config} from '../utils/config';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {createAddress, getAddress} from '../app/api/address';

const DeliveryAddress = () => {
  const initialAddressState = {
    nama: '',
    provinsi: '',
    id_provinsi: '',
    kabupaten: '',
    id_kabupaten: '',
    detail: '',
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [idProvinsi, setIdProvinsi] = useState();
  const [nameProvinsi, setNameProvinsi] = useState();

  const [idKota, setIdKota] = useState();
  const [nameKota, setNameKota] = useState();

  const [dataAddress, setDataAddress] = useState([]);

  const [currentAddress, setCurrentAddress] = useState(initialAddressState);
  const {shipping} = useSelector(state => state.shipping);

  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [activeBox, setActiveBox] = useState();

  useEffect(() => {
    const deliveryAddress = JSON.parse(localStorage.getItem('shipping')) || [];
    deliveryAddress.map(item => {
      setActiveBox(item.key);
    }, '');
    fetchDataAddress();
  }, []);

  const active =
    'mt-5 mb-5 bg-green shadow-lg rounded-md hover:bg-yellow-200 hover:fill-current cursor-pointer border-solid border-2 border-gray  bg-green-400 font-semibold';
  const inactive =
    'mt-5 mb-5 bg-white shadow rounded-md hover:bg-yellow-200 hover:fill-current cursor-pointer';

  const addAddressNotif = () =>
    toast.success('Delivery Address Successfully To Added', {
      position: 'bottom-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const addAddressNotifError = () =>
    toast.error('Input Valid Delivery Address', {
      position: 'bottom-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const [isOpen, setIsOpen] = useState(false);
  const dispatchHandler = () => {
    if (!isOpen) {
      dispatch({type: 'SHIPPING', payload: true});
      setIsOpen(true);
      fetchDataProvinsi();
    } else {
      dispatch({type: 'SHIPPING', payload: false});
      setIsOpen(false);
    }
  };

  const fetchDataProvinsi = async () => {
    const {data} = await axios.get(
      `http://api.rajaongkir.com/starter/province?key=${config.raja_ongkir_key}`,
    );
    const results = [];
    data.rajaongkir.results.map(value => {
      results.push({
        value: value.province,
        key: value.province_id,
      });
    });
    setOptions([{value: 'Select Province', name: ''}, ...results]);
  };

  const fetchDataAddress = async e => {
    getAddress(10)
      .then(response => {
        setDataAddress(response.data);
        console.log(response.data);
      })
      .catch(e => {
        return e;
      });
  };

  const handleChange = async e => {
    e.preventDefault();
    const {options, selectedIndex} = e.target;
    setNameProvinsi(options[selectedIndex].innerHTML);
    setIdProvinsi(e.target.value);
    async function fetchDataKota() {
      const {data} = await axios.get(
        `http://api.rajaongkir.com/starter/city?key=${config.raja_ongkir_key}&province=${e.target.value}`,
      );
      const results = [];
      data.rajaongkir.results.map(value => {
        results.push({
          key: value.city_id,
          value: value.city_name,
        });
      });
      setOptions2([{value: 'Select City', name: ''}, ...results]);
    }
    fetchDataKota();
  };

  const handleChangeKota = async e => {
    const {options, selectedIndex} = e.target;
    setNameKota(options[selectedIndex].innerHTML);
    setIdKota(e.target.value);
  };

  const handleInputChange = event => {
    const {name, value} = event.target;
    setCurrentAddress({...currentAddress, [name]: value});
  };

  const handleSelectAddress = event => {
    const deliveryAddress = {
      key: event.currentTarget.getAttribute('data-key'),
      id_provinsiTag: event.currentTarget.dataset.id_provinsiTag,
      provinsiTag: event.currentTarget.dataset.provinsiTag,
      id_kabupatenTag: event.currentTarget.dataset.id_kabupatenTag,
      kabupatenTag: event.currentTarget.dataset.kabupatenTag,
      detailTag: event.currentTarget.dataset.detailTag,
      id: event.currentTarget.dataset.id,
      user: user.userInfo.details._id,
    };

    const shipping = JSON.parse(localStorage.getItem('shipping')) || [];
    const isShippingExist = shipping.find(
      item => item.user === deliveryAddress.user,
    );
    if (isShippingExist) {
      const updatedShipping = shipping.map(item => {
        if (item.user === deliveryAddress.user) {
          return {
            ...deliveryAddress,
            key: event.currentTarget.getAttribute('data-key'),
          };
        }
        return deliveryAddress;
      });
      console.log(isShippingExist);
      localStorage.setItem('shipping', JSON.stringify(updatedShipping));
    } else {
      localStorage.setItem(
        'shipping',
        JSON.stringify([
          {
            ...deliveryAddress,
            key: event.currentTarget.getAttribute('data-key'),
          },
        ]),
      );
    }
    setActiveBox(event.currentTarget.getAttribute('data-key'));
  };

  // const test = JSON.parse(localStorage.getItem('shipping')) || [];
  // const updatedShipping = test.filter(
  //   item => item?.user !== user.userInfo.details._id,
  // );
  // localStorage.setItem('shipping', JSON.stringify(updatedShipping));

  const resetForm = () => {
    setCurrentAddress(initialAddressState);
    location.reload();
  };

  const saveAddress = async e => {
    const data = {
      nama: currentAddress.nama,
      id_provinsi: idProvinsi,
      provinsi: nameProvinsi,
      id_kabupaten: idKota,
      kabupaten: nameKota,
      detail: currentAddress.detail,
      user: user.userInfo.details._id,
    };

    createAddress(data)
      .then(response => {
        console.log(response);
        if (response.statusText === 'OK') {
          addAddressNotif();
          setTimeout(() => {
            resetForm();
          }, 1500);
          dispatchHandler({type: 'SHIPPING', payload: false});
        }
      })
      .catch(e => {
        return addAddressNotifError();
      });
  };

  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-full mt-2">
        <div>
          <button
            type="button"
            onClick={() => dispatchHandler({type: 'SHIPPING', payload: false})}
            className="relative w-full flex justify-center items-center px-5
            py-2.5 font-medium tracking-wide text-white capitalize bg-black
            rounded-md hover:bg-gray-900 focus:outline-none transition
            duration-300 transform active:scale-95 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF">
              <g>
                <rect fill="none" height="24" width="24"></rect>
              </g>
              <g>
                <g>
                  <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                </g>
              </g>
            </svg>
            <span className="pl-2 mx-1">Create new shipping label</span>
          </button>

          {shipping && (
            <div className="mt-5 mb-5 bg-white rounded-md shadow">
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <svg
                    className="inline align-text-top"
                    width="21"
                    height="20.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000">
                    <g>
                      <path
                        d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                        fill="none"
                        id="svg_1"
                        stroke="null"></path>
                      <path
                        d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                        id="svg_2"></path>
                      <circle
                        cx="7.04807"
                        cy="6.97256"
                        r="2.5"
                        id="svg_3"></circle>
                    </g>
                  </svg>
                  <h1 className="inline text-2xl font-semibold leading-none">
                    Receiver
                  </h1>
                </div>
                <div className="flex-none pt-2.5 pr-2.5 pl-1"></div>
              </div>
              <div className="px-5 pb-5">
                <form>
                  <label
                    htmlFor="name"
                    className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 mb-5"
                    id="nama"
                    name="nama"
                    value={currentAddress.nama}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Name"
                  />
                  <label
                    htmlFor="province"
                    className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                    Select Province
                  </label>
                  <select
                    id="provinsi"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 mb-5">
                    {options.map((option, index) => {
                      return (
                        <option
                          key={index}
                          value={option.key}
                          name={option.value}>
                          {option.value}
                        </option>
                      );
                    })}
                  </select>
                  <label
                    htmlFor="city"
                    className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                    Select City
                  </label>
                  <select
                    id="city"
                    onChange={handleChangeKota}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 mb-5">
                    {options2.map((option, index) => {
                      return (
                        <option
                          key={index}
                          value={option.key}
                          name={option.value}>
                          {option.value}
                        </option>
                      );
                    })}
                  </select>
                  <label
                    htmlFor="detail"
                    className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                    Address Detail
                  </label>
                  <textarea
                    id="detail"
                    name="detail"
                    value={currentAddress.detail}
                    onChange={handleInputChange}
                    className="resize bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 mb-5"></textarea>
                  {/* <label
                  htmlFor="kecamatan"
                  className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                  Select Kecamatan
                </label>
                <select
                  id="kecamatan"
                  onChange={handleChangeKelurahan}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 mb-5">
                  {options3.map(option => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.key}
                      </option>
                    );
                  })}
                </select>
                <label
                  htmlFor="kelurahan"
                  className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                  Select Kelurahan
                </label>
                <select
                  id="kelurahan"
                  //  onChange={handleChangeKelurahan}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 mb-5">
                  {options4.map(option => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.key}
                      </option>
                    );
                  })}
                </select> */}
                </form>
              </div>
              <hr className="mt-4" />
              <div className="flex flex-row-reverse p-3">
                <div className="flex-initial pl-3">
                  <button
                    type="button"
                    onClick={saveAddress}
                    className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF">
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path
                        d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                        opacity=".3"></path>
                      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                    </svg>
                    <span className="pl-2 mx-1">Save</span>
                  </button>
                </div>
                <div className="flex-initial">
                  <button
                    type="button"
                    className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px">
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path d="M8 9h8v10H8z" opacity=".3"></path>
                      <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                    </svg>
                    <span className="pl-2 mx-1">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {dataAddress?.data?.map((address, index) => {
            return (
              <div
                key={index}
                onClick={handleSelectAddress}
                data-key={index}
                data-id={address._id}
                data-name-tag={address.name}
                data-detail-tag={address.detail}
                data-provinsi-tag={address.provinsi}
                data-kabupaten-tag={address.kabupaten}
                data-id_kabupaten-tag={address.id_kabupaten}
                data-id_provinsi-tag={address.id_provinsi}
                className={activeBox == index ? active : inactive}>
                <div className="flex">
                  <div className="flex-1 py-5 pl-5 overflow-hidden">
                    <ul>
                      <li className="text-md text-gray-600 uppercase mt-2 mb-3 font-bold">
                        {address.nama}
                      </li>
                      <li>{address.detail}</li>
                      <li>{address.provinsi}</li>
                      <li>{address.kabupaten}</li>
                    </ul>
                  </div>
                  <div className="flex-none pt-2.5 pr-2.5 pl-1">
                    <button
                      type="button"
                      className="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path
                          d="M5 18.08V19h.92l9.06-9.06-.92-.92z"
                          opacity=".3"></path>
                        <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
