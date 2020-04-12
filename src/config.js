import axios from 'axios';
export const baseURL = 'http://localhost:8080';
const url = 'http://localhost:8080';
// const url = 'http://192.168.1.137:5000';
// const url = 'https://rocky-anchorage-12632.herokuapp.com';
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.baseURL = baseURL
    return config;
  },
  error => {
    Promise.reject(error)
  });
// Axios.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     if (403 === error.response.status) {
//         console.log('Forbidden');
//     } else {
//         return Promise.reject(error);
//     }
// });
export default axios;

export const API = {
  MAIN: `${url}`,
  SIGN_IN: `${url}/api/users/signin`,
  TOKEN: `${url}/`,
};

export const CREA_USER = `/api/users/signup`;
export const SIGN_IN = `/api/users/login`;
export const TOKEN = `${url}/auth`;
export const CART_GET = `/api/cart/get_cart_items`;
export const PROD_GET_ALL = `/api/products/all_products`;
export const CART_ADD = `/api/cart/add_item_to_cart`;
export const CART_REMOVE = `${url}/api/cartItem/remove`;
export const PROD_GET_ONE = `/api/products`;
export const PROD_IMAGE = `${url}/`;
export const CHECK_CODE = `${url}/api/promo-code`;
export const REMOVE_CODE = `${url}/api/promo-remove`;
export const CHECKOUT = `${url}/api/checkout`;
export const SHIP_OPTIONS_GET = `${url}/api/shipping`;
export const VERIFY_EMAIL = `${url}/api/users/verify`;

export const ScreenSize = {
  mobile: '450px',
};
