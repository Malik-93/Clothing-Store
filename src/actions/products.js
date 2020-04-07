import axios from '../config';
import { PROD_GET_ALL } from '../config';
import exceptionsHandler from './exceptionsHandler';

export const getAllProducts = () => {
  return dispatch => {
    dispatch({
      type: 'LOADING',
      loading: {
        loader: true,
      },
    });
    axios
      .get(PROD_GET_ALL)
      .then(({ data }) => {
        dispatch({
          type: 'PRODUCTS:RECIEVE_ALL',
          contents: {
            loading: false,
            items: data.products,
          },
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
