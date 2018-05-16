import React, { Component } from 'react';
import { Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { authorizeAction } from './../../../actions/authorize';

import './AuthForm.scss';

class AuthForm extends Component {
  state = {
    login: '',
    pass: '',
    isInvalid: false,
  }

  handleSubmit = (e) => {
    const { login, pass } = this.state;

    e.preventDefault();

    this.props.authorizeAction({ login, pass })
      .catch(() => {
        this.setState({
          login: '',
          pass: '',
          isInvalid: true,
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isInvalid: false,
    });
  }

  render() {
    return (
      <div className="Auth">
        <Form onSubmit={(e) => { this.handleSubmit(e); }} className="AuthForm">
          <InputGroup>
            <InputGroupAddon addonType="prepend">Login</InputGroupAddon>
            <Input
              name="login"
              value={this.state.login}
              invalid={this.state.isInvalid}
              onChange={e => this.handleChange(e)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
            <Input
              type="password"
              name="pass"
              value={this.state.pass}
              invalid={this.state.isInvalid}
              onChange={e => this.handleChange(e)}
            />
          </InputGroup>
          <Button size="md">Login</Button>
        </Form>
      </div>
    );
  }
}

AuthForm.propTypes = {
  authorizeAction: PropTypes.func.isRequired,
};

export default connect(null, { authorizeAction })(AuthForm);
