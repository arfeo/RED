import React, { Component } from 'react';
import { Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { authorizeAction } from './../../../actions/authorize';

class AuthForm extends Component {
  state = {
    login: '',
    pass: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.authorizeAction({ ...this.state })
      .catch(() => {
        this.setState({
          login: '',
          pass: '',
        });
      });
  }

  handleChange = (e) => {
    // data[e.target.name] = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { auth } = this.props;

    return (
      <Form onSubmit={(e) => { this.handleSubmit(e); }}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Login</InputGroupAddon>
          <Input
            name="login"
            value={this.state.login}
            onChange={e => this.handleChange(e)}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
          <Input
            type="password"
            name="pass"
            value={this.state.pass}
            onChange={e => this.handleChange(e)}
          />
        </InputGroup>
        <Button size="sm">Login</Button>
        <div>{auth.errorText ? auth.errorText : ''}</div>
      </Form>
    );
  }
}

AuthForm.propTypes = {
  authorizeAction: PropTypes.func.isRequired,
  auth: PropTypes.any,
};

export default connect(
  state => ({
    auth: state.auth,
  }),
  {
    authorizeAction,
  }
)(AuthForm);
