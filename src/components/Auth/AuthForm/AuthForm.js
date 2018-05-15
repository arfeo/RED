import React from 'react';
import { Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { authorizeAction } from './../../../actions/authorize';

const AuthForm = (props) => {
  const data = {
    login: '',
    pass: '',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.authorizeAction(data);
  };

  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
  };

  return (
    <Form onSubmit={(e) => { handleSubmit(e); }}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">Login</InputGroupAddon>
        <Input
          name="login"
          onChange={e => handleChange(e)}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
        <Input
          type="password"
          name="pass"
          onChange={e => handleChange(e)}
        />
      </InputGroup>
      <Button size="sm">Login</Button>
      <div>{props.auth.errorText ? props.auth.errorText : ''}</div>
    </Form>
  );
};

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
