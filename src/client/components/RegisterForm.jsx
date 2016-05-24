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
          className="form-control"
          placeholder="Enter your email"
          onChange={props.onEmailChange}
        />
      </fieldset>
      <fieldset className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          placeholder="Enter your name"
          onChange={props.onNameChange}
        />
      </fieldset>
      <fieldset className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Choose a password"
          onChange={props.onPasswordChange}
        />
        <small className="text-muted">
          Use at least one number, one letter, and eight characters.
        </small>
      </fieldset>
      <button className="btn btn-success btn-block" onClick={props.onRegisterClick} >
        Sign up for Day by Day
      </button>
    </form>
  );
}

RegisterForm.propTypes = {
  error: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

export default RegisterForm;
