import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import AuthForm from './AuthForm/AuthForm';
import App from '../../containers/App';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ensureAuth: (p) => {
        const { isLoggedIn } = p;

        if (!isLoggedIn) {
          p.Redirect('/');
        }

        return true;
      },
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    prevState.ensureAuth(nextProps);

    return null;
  }

  componentDidMount() {
    this.state.ensureAuth(this.props);
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
  isLoggedIn: PropTypes.string.isRequired,
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
