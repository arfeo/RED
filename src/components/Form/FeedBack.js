/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { createTextMask } from 'redux-form-input-masks';

const phoneMask = createTextMask({
  pattern: '+7(999) 999-9999',
  guide: false,
});
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);
const aol = value =>
  (value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined);
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
    </div>
  </div>
);
renderField.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  type: PropTypes.any,
  meta: PropTypes.any,
};
const FeedBackForm = (props) => {
  const {
    handleSubmit,
  } = props;
  const submit = (values) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label>Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Phone</label>
        <div>
          <Field
            name="phone"
            component="input"
            type="text"
            placeholder="Phone"
            {...phoneMask}
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            label="email"
            type="text"
            validate={email}
            //warn={aol}
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit">
            Submit
        </button>
      </div>
    </form>
  );
};
FeedBackForm.propTypes = {
  handleSubmit: PropTypes.func,
};
export default reduxForm({
  form: 'feedback',
})(FeedBackForm);
