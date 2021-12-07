import "./Profile.css";
import React from "react";
import { ImHome3 } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { get_profile_info } from "../../actions/user";
import { ImSad } from "react-icons/im";

class ProfileStatic extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { app } = this.props;
    get_profile_info(this);
  }
  state = {
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
    id: this.props.user.match.params["id"],
    username: "",
    page_valid: true,
  };

  render() {
    return (
      <div className="wrapper">
        {this.state.page_valid ? (
          <div id="insideDiv">
            <Link to="/">
              <ImHome3 id="homeIcon" />
            </Link>

            <div id="profile-greet">Profile of {this.state.username}</div>
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
            </div>
          </div>
        ) : (
          <div>
            <Link to="/">
              <ImHome3 id="homeIcon" />
            </Link>
            <div id="user-non-exist">
              User no longer exists (deleted)!
              <br />
              <ImSad />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatic;
