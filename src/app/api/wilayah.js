import axios from 'axios';
import {config} from '../../utils/config';

export const getProvinsi = async () => {
  return await axios.get(
    `https://api.binderbyte.com/wilayah/provinsi?api_key=${config.wilayah_key}`,
  );
};

export const getKabupaten = async id_provinsi => {
  return await axios.get(
    `https://api.binderbyte.com/wilayah/kabupaten?api_key=${config.wilayah_key}&id_provinsi=${id_provinsi}`,
  );
};

export const getKecamatan = async id_kabupaten => {
  return await axios.get(
    `https://api.binderbyte.com/wilayah/kecamatan?api_key=${config.wilayah_key}&id_kabupaten=${id_kabupaten}`,
  );
};

export const getKelurahan = async id_kecamatan => {
  return await axios.get(
    `https://api.binderbyte.com/wilayah/kelurahan?api_key=${config.wilayah_key}&id_kecamatan=${id_kecamatan}`,
  );
};
