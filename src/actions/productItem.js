import axios from '../config';
import { PROD_GET_ONE } from '../config';
import exceptionsHandler from './exceptionsHandler';

export const getProduct = productID => {
  return dispatch => {
    dispatch({
      type: 'LOADING',
      loading: {
        loader: true,
      },
    });
    axios
      .get(`${PROD_GET_ONE}/${productID}`)
      .then(({ data }) => {
        dispatch({
          type: 'PRODUCT:RECIEVE_ITEM',
          loading: false,
          error: false,
          product: data.product,
        });
      })
      .catch((error) => {
        exceptionsHandler(error, dispatch)
      })
      .finally(() => {
        dispatch({
          type: 'LOADING',
          loading: {
            loader: false,
          },
        });
      })
  };
};
