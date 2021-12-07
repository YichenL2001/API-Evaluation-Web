import React from "react";
import "./login.css";
import { updateLoginForm, login } from "../../actions/user";

/* Component for the Login page */
class LoginComp extends React.Component {
  render() {
    const { title, LoginPage, app } = this.props;
    return (
      <div>
        <div className="login-wrapper">
          <p id="login-fail-msg">{LoginPage.state.message}</p>
          <h2>{title}</h2>
          <label>Username:</label>
          <input
            className="form-input"
            onChange={(e) => updateLoginForm(LoginPage, e.target)}
            type="text"
            name="username"
          />

          <label>Password:</label>
          <input
            className="form-input"
            onChange={(e) => updateLoginForm(LoginPage, e.target)}
            type="text"
            name="password"
          />

          <button className="login-btn" onClick={() => login(LoginPage, app)}>
            Log In
          </button>
        </div>
      </div>
    );
  }
}
export default LoginComp;
