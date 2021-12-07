import React from "react";

import LoginComp from "./LoginComp";
import "./login.css";

/* Component for the Login page */
class AdLogin extends React.Component {
  state = {
    username: "",
    password: "",
    is_regUser: false,
  };
  render() {
    const { app } = this.props;
    return <LoginComp title="Admin Login" app={app} LoginPage={this} />;
  }
}

export default AdLogin;
