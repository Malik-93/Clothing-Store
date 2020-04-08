import axios from '../config';
import { CART_ADD, CART_REMOVE } from '../config';
import exceptionsHandler from './exceptionsHandler';

export const addItem = (product) => {
  return dispatch => {
    dispatch({
      type: 'LOADING',
      loading: {
        loader: true,
      },
    });
    axios
      .patch(CART_ADD, { product })
      .then(({ data }) => {
        dispatch({
          type: 'CART:ADD_ITEM',
          loading: false,
          itemAdded: true,
          error: false,
          message: data.message,
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
      });
  };
};

export const removeItem = item => {
  return dispatch => {
    dispatch({
      type: 'CART:START_TRANSACTION',
      loading: true,
    });
    axios
      .put(CART_REMOVE, { cartItem: item })
      .then(({ data }) => {
        dispatch({
          type: 'CART:REMOVE_ITEM',
          loading: false,
          error: false,
          message: data.message,
          contents: data.cart,
        });
      })
      .catch(err => {
        dispatch({
          type: 'CART:ERROR',
          loading: false,
          error: err.response.data.error,
        });
      });
  };
};

export const confirmItemAdded = () => {
  return dispatch => {
    dispatch({
      type: 'CART:CONFIRM_ITEM_ADDED',
      itemAdded: false,
    });
  };
};
