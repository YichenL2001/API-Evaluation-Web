import React from "react";
import UserLogin from "./UserLogin";
import "./login.css";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdCardMembership } from "react-icons/md";
import { ImHome3 } from "react-icons/im";
import SignupPage from "./SignupPage";

import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/login");
  }
  state = {
    popup: false,
    username: "",
    password: "",
    is_regUser: true,
    message: "",
  };
  setTrue = () => {
    this.setState({
      popup: true,
    });
  };
  setFalse = () => {
    this.setState({
      popup: false,
    });
  };
  render() {
    const { app } = this.props;
    return (
      <div>
        <div id="login-page">
          <Link to="/">
            <ImHome3 id="login_home" />
          </Link>
          <div id="icon_menu">
            <MdOutlineAdminPanelSettings className="icon_log" />
            <Link id="label_log_ad" to="/adminLogin">
              <h4>Admin</h4>
            </Link>
            <MdCardMembership className="icon_log" />
            <button className="btn_log">
              <h4
                id="label_log"
                onClick={() => {
                  this.setTrue();
                }}
              >
                SignUp
              </h4>
            </button>
          </div>
          <div className="w-100">
            <UserLogin LoginPage={this} app={app} />
          </div>
        </div>
        {this.state.popup ? (
          <SignupPage setFalse={this.setFalse} prompt="Sign up" />
        ) : null}
      </div>
    );
  }
}

export default LoginPage;
