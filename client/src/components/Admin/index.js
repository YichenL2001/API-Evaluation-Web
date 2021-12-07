import React from "react";
import "./admin.css";
import { Link } from "react-router-dom";
import ENV from "./../../config.js";
import SignupPage from "../Login/SignupPage";
import AdminEdit from "./adminEdit";
import { admin_get_user_info } from "../../actions/user";
const API_HOST = ENV.api_host;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        phone: "",
        gender: "",
        birthday: "",
        job: "",
        skills: "",
        more: "",
      },
      users: [],
      url: `${API_HOST}/api/users/`,
      popup: false,
      popup2: false,
      curr_userId: null,
      curr_username: null,
    };
    this.props.history.push("/admin");
  }

  setTrue = () => {
    this.setState({
      popup: true,
    });
  };
  setFalse = () => {
    this.setState({
      popup: false,
    });
    this.getUsers();
  };
  setTrue2 = () => {
    this.setState({
      popup2: true,
    });
  };
  setFalse2 = () => {
    this.setState({
      popup2: false,
    });
  };
  getUsers = () => {
    fetch(this.state.url)
      .then((res) => {
        if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json();
        } else {
          alert("Could not get users");
        }
      })
      .then((res) => {
        this.setState({ users: res["users"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadUser(id, username) {
    this.setState({ curr_userId: id });
    this.setState({ curr_username: username });
    admin_get_user_info(id, this);
  }

  removeUser = (i) => {
    fetch(this.state.url + this.state.users[i]._id, {
      method: "Delete",
    })
      .then((res) => {
        this.getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    document.title = "Utopia";
    this.getUsers();
  }

  render() {
    return (
      <div>
        <div className="admin">
          <div className="leftbar">
            <ul>
              <Link to="/" className="list">
                <li>Home</li>
              </Link>
              <Link to="/admin" className="list">
                <li>Edit Users</li>
              </Link>
              <Link to="/adminPages" className="list">
                <li>Edit Libraries</li>
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
                <strong>User Accounts</strong>
              </li>
              <button onClick={this.setTrue}>Add New User</button>
              {this.state.users.map((user, key) => (
                <li key={user._id}>
                  {user["username"]}
                  <button onClick={this.removeUser.bind(this, key)}>
                    Delete
                  </button>
                  <button
                    onClick={() => this.loadUser(user._id, user["username"])}
                  >
                    Edit user info
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {this.state.popup ? (
          <SignupPage setFalse={this.setFalse} prompt="Add user" />
        ) : null}
        {this.state.popup2 ? <AdminEdit AdminPage={this} /> : null}
      </div>
    );
  }
}

export default Admin;
