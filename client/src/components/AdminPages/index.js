import React from "react";
import { Link } from "react-router-dom";
import ENV from "./../../config.js";
const API_HOST = ENV.api_host;
class AdminPages extends React.Component {
  state = {
    libraries: [],
    url: `${API_HOST}/api/libraries/`,
  };
  getLibraries() {
    fetch(this.state.url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        this.setState({ libraries: res["libraries"] });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  removePages = (i) => {
    fetch(this.state.url + this.state.libraries[i]._id, {
      method: "Delete",
    }).then((res) => this.getLibraries());
  };
  componentDidMount() {
    document.title = "Utopia";
    this.getLibraries();
  }

  render() {
    return (
      <div className="admin">
        <div className="leftbar">
          <ul>
            <Link to="/" className="list">
              <li>Home</li>
            </Link>
            <Link to="/admin" className="list">
              <li>Users</li>
            </Link>
            <Link to="/adminPages" className="list">
              <li>Pages</li>
            </Link>
          </ul>
        </div>
        <div className="right">
          <h1>
            <strong>
              <u>Admin, Welcome!</u>
            </strong>
          </h1>
          <ul>
            <li>
              <strong>Web Pages</strong>
            </li>
            {this.state.libraries.map((page, key) => (
              <li key={page._id}>
                {page["name"]}
                <button onClick={this.removePages.bind(this, key)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default AdminPages;
