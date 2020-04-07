import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/auth';
import SignUp from './SignUp';
import { withRouter } from 'react-router-dom';

export class SignUpContainer extends Component {
  handleSubmit = info => {
    const { fname, lname, email, password } = info;
    this.props.signUp(fname, lname, email, password, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    const auth = nextProps.auth;
    if (auth.accountCreated) {
      this.props.history.push('/signin');
    }
  }
  render() {
    return <SignUp {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signUp: (fname, lname, email, pass, history) => dispatch(signUp(fname, lname, email, pass, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpContainer));
