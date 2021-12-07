import React from "react";

import LoginComp from "./LoginComp";
import "./login.css";

/* Component for the Login page */
class UserLogin extends React.Component {
  render() {
    const { app, LoginPage } = this.props;
    return <LoginComp title="User Login" app={app} LoginPage={LoginPage} />;
  }
}

export default UserLogin;
