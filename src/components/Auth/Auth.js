import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import AuthForm from './AuthForm/AuthForm';
import App from './../../containers/App';

class Auth extends Component {
  ensureAuth = (props) => {
    const { isLoggedIn } = props;

    if (!isLoggedIn) {
      props.Redirect('/');
    }

    return true;
  }

  componentWillReceiveProps(props) {
    this.ensureAuth(props);
  }

  componentWillMount() {
    this.ensureAuth(this.props);
  }

  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return <AuthForm />;
    }

    return <App />;
  }
}

Auth.propTypes = {
  isLoggedIn: PropTypes.any.isRequired,
};

export default connect(
  state => ({
    isLoggedIn: state.auth.login,
    routing: state.routing,
  }),
  dispatch => ({
    Redirect: (payload) => {
      dispatch(push(payload));
    },
  })
)(Auth);
