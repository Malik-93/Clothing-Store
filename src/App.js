import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppRouter from './components/router/AppRouter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TokenAuthLoader from './components/InitLoad/TokenAuthLoader';
import DefaultAppLoader from './components/defaultAppLoader';
import jwt_decode from 'jwt-decode';
import { signOut } from './actions/auth';
const store = configureStore();
class App extends Component {
  componentDidMount() {
    // if token exists, automatically sign in
    const token = localStorage.getItem('token');
    if (token && token !== "") {
      const decoded = jwt_decode(token);
      store.dispatch({
        type: 'AUTH:SUCCESSFUL_SIGN_IN',
        auth: {
          token: token,
          loading: false,
          user: decoded
        },
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
            <AppRouter />
            <TokenAuthLoader />
            <DefaultAppLoader />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
