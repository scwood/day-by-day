import React, { PropTypes } from 'react';

function RegisterForm(props) {
  return (
    <form>
      {props.error
        ? <div className="alert alert-danger">{props.error}</div>
        : null }
      <fieldset className="form-group">
        <label>Email</label>
        <input
          value={props.email}
          className="form-control"
          placeholder="Enter your email"
          onChange={props.onEmailChange}
        />
      </fieldset>
      <fieldset className="form-group">
        <label>Password</label>
        <input
          value={props.password}
          type="password"
          className="form-control"
          placeholder="Choose a password"
          onChange={props.onPasswordChange}
        />
      </fieldset>
      <hr />
      <button
        className="btn btn-success btn-block"
        onClick={props.onRegisterClick}
      >
        Sign up for Day by Day
      </button>
    </form>
  );
}

RegisterForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

export default RegisterForm;
