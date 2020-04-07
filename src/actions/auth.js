import axios from "../config";
import { SIGN_IN, TOKEN, CREA_USER, VERIFY_EMAIL } from '../config';
import exceptionsHandler from "./exceptionsHandler";;
const tokenObject = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

export const tokenAuth = token => {
  return dispatch => {
    dispatch({
      type: 'AUTH:BEGIN_TOKEN_SIGN_IN',
      auth: {
        loading: true,
      },
    });
    axios
      .get(TOKEN, tokenObject)
      .then(({ data }) => {
        dispatch({
          type: 'AUTH:SUCCESSFUL_TOKEN_SIGN_IN',
          auth: {
            loading: false,
            token: localStorage.getItem('token'),
            id: data.user._id,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: 'AUTH:FAILED_SIGN_IN',
          auth: {
            loading: false,
          },
        });
      });
  };
};

export const signIn = (email, password, history) => {
  let user = {
    email,
    password,
  }
  return dispatch => {
    dispatch({
      type: 'AUTH:CLICKED_SIGN_IN',
      auth: {
        loading: true,
      },
    });
    axios
      .post(SIGN_IN, user)
      .then(({ data, status }) => {
        const { token } = data;
        if (status === 200) {
          localStorage.setItem('token', token);
          dispatch({
            type: 'AUTH:SUCCESSFUL_SIGN_IN',
            auth: {
              token: token,
              loading: false,
              id: data.id,
            },
          });
          history.push('/products')
        }
      })
      .catch((error) => {
        exceptionsHandler(error, dispatch)
      })
      .finally(() => {
        dispatch({
          type: 'AUTH:FAILED_SIGN_IN',
          auth: {
            loading: false,
          }
        })
      });
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({
      type: 'AUTH:CLICKED_SIGN_OUT',
      auth: {
        loading: true,
      },
    });
    localStorage.removeItem('token');
    dispatch({
      type: 'AUTH:SUCCESSFUL_SIGN_OUT',
      auth: {
        loading: false,
        token: null,
      },
    });
  };
};

export const signUp = (fname, lname, email, password, history) => {
  return dispatch => {
    dispatch({
      type: 'AUTH:CLICKED_SIGN_UP',
      auth: {
        loading: true,
      },
    });
    axios
      .post(CREA_USER, { fname, lname, email, password })
      .then(({ data }) => {
        dispatch({
          type: 'AUTH:SUCCESSFUL_ACCOUNT_CREATION',
          auth: {
            loading: false,
            error: false,
            message: data.message,
            accountCreated: data.accountCreated,
            user: data.user,
            // token: data.token
          },
        });
        history.push('/signin')
      })
      .catch(error => {
        exceptionsHandler(error, dispatch)
      })
      .finally(() => {
        dispatch({
          type: 'AUTH:FAILED_SIGN_UP',
          auth: {
            loading: false,
          }
        })
      });
  };
};

export const verifyEmail = token => {
  return dispatch => {
    dispatch({
      type: 'AUTH:BEGIN_VERIFY_EMAIL',
      auth: {
        loading: true,
      },
    });
    axios
      .post(VERIFY_EMAIL, { token })
      .then(({ data }) => {
        dispatch({
          type: 'AUTH:SUCCESSFUL_VERIFY_EMAIL',
          auth: {
            loading: false,
            error: false,
            id: data.id,
            message: data.message,
            token: data.token,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: 'AUTH:FAILED_VERIFY_EMAIL',
          auth: {
            loading: false,
            error: false,
          },
        });
      });
  };
};
