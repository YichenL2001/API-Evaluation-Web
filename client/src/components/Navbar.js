import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
class Navbar extends React.Component {
  render() {
    const { app } = this.props;
    //Here should call server to get the information on how the pages will be showed
    const MenuItems = [
      { title: "Home", url: "/", cName: "nav-links" },
      { title: "Python", url: "/python", cName: "nav-links" },
      { title: "Javascipt", url: "/javascript", cName: "nav-links" },
      { title: "Java", url: "/java", cName: "nav-links" },
    ];

    return (
      <nav>
        {MenuItems.map((item, index) => {
          return (
            <NavLink
              className="languagechoice"
              key={index}
              exact
              to={item.url}
              activeClassName="activeType"
            >
              {item.title}
            </NavLink>
          );
        })}

        {!app.state.currentUser ? (
          <Link to="/login">
            <button id="linkToProfile">Login</button>
          </Link>
        ) : !app.state.is_regUser ? (
          <Link to="/admin">
            <button id="linkToProfile">Admin page</button>
          </Link>
        ) : (
          <Link to="/profile">
            <button id="linkToProfile">My profile</button>
          </Link>
        )}
      </nav>
    );
  }
}

export default Navbar;
