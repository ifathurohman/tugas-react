const devConfig = {
  api_host: import.meta.env.VITE_BASE_URL,
  secret_key: import.meta.env.VITE_SECRET_KEY,
  raja_ongkir_key: import.meta.env.VITE_API_KEY_ONGKIR,
  wilayah_key: import.meta.env.VITE_API_KEY_WILAYAH,

  id_merchant: import.meta.env.VITE_ID_MERCHANT,
  client_key: import.meta.env.VITE_CLIENT_KEY,
};

const prodConfig = {
  api_host: 'Your production url',
};

export const config = devConfig;