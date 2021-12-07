import "./Profile.css";
import React from "react";
import InfoForm from "./InfoForm";
import { ImHome3 } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  get_user_info,
  send_user_info,
  get_user_fav_lib,
  delete_user_fav_lib,
} from "../../actions/user";

//App component
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/profile");
  }
  componentDidMount() {
    const { app } = this.props;
    get_user_info(app, this);
    get_user_fav_lib(app, this);
  }
  state = {
    popup: false,

    dynamicPerson: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      birthday: "",
      job: "",
      skills: "",
      more: "",
    },

    person: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      birthday: "",
      job: "",
      skills: "",
      more: "",
    },
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newDynamic = this.state.dynamicPerson;
    newDynamic[name] = value;
    this.setState({
      dynamicPerson: newDynamic,
    });
  };
  setDynamic = () => {
    const newPerson = {};
    for (const key in this.state.person) {
      newPerson[key] = this.state.person[key];
    }
    this.setState({
      dynamicPerson: newPerson,
    });
  };

  togglePop = () => {
    this.setState({
      popup: !this.state.popup,
    });
  };
  handleSubmit = (event, app) => {
    event.preventDefault();
    const target = event.target;
    const newPerson = this.state.person;
    for (const key in this.state.person) {
      newPerson[key] = target[key].value;
    }
    send_user_info(newPerson, app, this);
  };

  handleDelete = (i, app) => {
    const new_libs = app.state.fav_posts.filter(function (lib, index) {
      if (index !== i) return lib;
      return null;
    });
    const delete_lib = app.state.fav_posts.filter(function (lib, index) {
      if (index === i) return lib;
      return null;
    });
    app.setState({ fav_posts: new_libs });
    delete_user_fav_lib(app, delete_lib[0]);
  };

  render() {
    const { app } = this.props;
    return (
      <div className="wrapper">
        <div id="insideDiv">
          <Link to="/">
            <ImHome3 id="homeIcon" />
          </Link>
          <div id="profile-greet">Hi {app.state.currentUser}</div>
          <div id="placeholder"></div>
          {/* <img id="photo" src={image} alt="not found" /> */}
          <h2 id="name">{this.state.person.name}</h2>
          <div id="occupation">{this.state.person.job}</div>
          <div id="about">
            <BsFillPersonFill />
            <span className="title">About</span>
          </div>
          <div className="aboutContent">
            <div className="aboutContent">
              <span className="title2">Basic Info</span>
              {Object.keys(this.state.person)
                .slice(1, 5)
                .map((item, index) => {
                  return (
                    <div key={index}>
                      {item}: {this.state.person[item]}
                    </div>
                  );
                })}
            </div>
            <div className="aboutContent">
              <span className="title2">Skills</span>
              <div>{this.state.person.skills}</div>
            </div>
            <div className="aboutContent">
              <span className="title2">More About Me</span>
              <div>{this.state.person.more}</div>
            </div>
            <button
              id="editProfile"
              onClick={() => {
                this.togglePop();
                this.setDynamic();
              }}
            >
              edit
            </button>
          </div>
          <form
            onSubmit={(event) => {
              this.handleSubmit(event, app);
              this.togglePop();
            }}
          >
            {this.state.popup ? (
              <InfoForm
                dynamicPerson={this.state.dynamicPerson}
                togglePop={this.togglePop}
                handleInputChange={this.handleInputChange}
              />
            ) : null}
          </form>
        </div>
        <div id="fav-post">
          <AiFillHeart id="heartIcon" />
          <h4 className="title3">Favorite posts</h4>

          <ul id="fav-lst">
            {app.state.fav_posts.map((lib, key) => {
              return (
                <li className="profile-lst" key={key}>
                  <BsDot />
                  <Link to={"/LibraryPage/" + lib.lib_id}>{lib.name}</Link>
                  <img
                    className="profile-lib-img"
                    src={lib.pic}
                    alt={lib.name}
                  />
                  <button
                    className="profile-rm"
                    type="button"
                    onClick={() => this.handleDelete(key, app)}
                    // onClick={this.handleDelete.bind(this, key)}
                  >
                    {<ImCross id="profile-cross" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;
