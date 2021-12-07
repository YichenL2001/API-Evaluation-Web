import React from "react";
import "./Signup.css";
import { updateLoginForm, register } from "../../actions/user";
/* Component for the Signup and Login page */
class Signup extends React.Component {
  render() {
    const { setFalse, SignupPage, prompt } = this.props;
    return (
      <div className="popup_signup">
        <div className="signup-wrapper">
          <p className={`signup-message-${SignupPage.state.message.type}`}>
            {SignupPage.state.message.body}
          </p>
          <h3>{prompt}</h3>
          <label>Username:</label>
          <input
            className="signup-input"
            onChange={(e) => updateLoginForm(SignupPage, e.target)}
            type="text"
            name="username"
          />
          <label>Password:</label>
          <input
            className="signup-input"
            onChange={(e) => updateLoginForm(SignupPage, e.target)}
            type="text"
            name="password"
          />
          <div id="btn-div">
            <button className="signup-btn" onClick={() => register(SignupPage)}>
              {prompt}
            </button>
            <button className="signup-btn" onClick={setFalse}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
