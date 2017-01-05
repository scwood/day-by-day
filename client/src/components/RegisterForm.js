import React, { PropTypes } from 'react';

function RegisterForm({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onRegisterClick,
}) {
  return (
    <form>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          className="form-control"
          placeholder="Enter your email"
          onChange={onEmailChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          placeholder="Choose a password"
          onChange={onPasswordChange}
        />
      </div>
      <hr />
      <button className="btn btn-success btn-block" onClick={onRegisterClick}>
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
