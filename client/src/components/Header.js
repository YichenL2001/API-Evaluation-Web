import "./Header.css";
import React from "react";
import { logout } from "../actions/user";
class Header extends React.Component {
  componentDidMount() {
    document.title = "Utopia";
  }
  render() {
    const { app } = this.props;
    return (
      <div className="header">
        <h3>This is a library and framework ranking website</h3>

        {!app.state.currentUser ? (
          <div></div>
        ) : (
          <button id="logout_btn" onClick={() => logout(app)}>
            Log out
          </button>
        )}
      </div>
    );
  }
}

export default Header;
