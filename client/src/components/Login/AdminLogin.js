import React from "react";
import AdLogin from "./AdLogin";
import { Link } from "react-router-dom";
import "./login.css";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/adminLogin");
  }
  render() {
    const { app } = this.props;
    return (
      <div id="admin-login-page">
        <div id="icon_menu_ad">
          <AiOutlineUser />
          <Link id="label_log_user" to="/login">
            <h4>Back to User</h4>
          </Link>
        </div>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <MdOutlineAdminPanelSettings id="icon_admin" />
          <AdLogin app={app} />
        </div>
      </div>
    );
  }
}

export default AdminLogin;
