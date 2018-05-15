import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Login from './Login';

class Auth extends Component {
  ensureAuth = (props) => {
    const { isLoggedIn } = props;

    if (!isLoggedIn) {
      props.Redirect('/login');
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
    const { children, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Login />;
    }
    return <div>{children}</div>;
  }
}

Auth.propTypes = {
  isLoggedIn: PropTypes.any.isRequired,
  children: PropTypes.any,
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
