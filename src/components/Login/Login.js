import React, { Component } from 'react';
import { Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { push } from 'react-router-redux';
import { authorizeAction } from '../../actions/authorize';

import { constants } from '../../utils/constants';
const mail = /^\w*@{1}[a-zA-Z]*\.[a-zA-Z]*$/g;
const Login = (props) => {
  const data = {
    login: '',
    pass: '',
  };
  const message = { text: '' };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.authorizeAction(data);
  };
  const handleMask = (e, pattern) => {
    //console.log(pattern);
    const obj = { value: e.target.value, letter: e.key };
    //console.log((obj.value + obj.letter), (obj.value + obj.letter).match(pattern));
  };
  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
  };
  return (
    <Form onSubmit={(e) => { handleSubmit(e); }}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">Login</InputGroupAddon>
        <Input name="login" onKeyDown={(e) => { handleMask(e, mail); }} onChange={(e) => { handleChange(e); }} />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
        <Input type="password" name="pass" onChange={(e) => { handleChange(e); }} />
      </InputGroup>
      <Button size="sm">Login</Button>
      <div>{props.auth.text.length > 0 ? props.auth.text : ''}</div>
    </Form>
  );
};
Login.propTypes = {
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
)(Login);
