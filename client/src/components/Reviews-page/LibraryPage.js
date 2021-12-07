import React from "react";
import "./reviews.css";
import Review from "../Review";
import Navbar from "../Navbar";
import ENV from "./../../config.js";
import { add_to_userfav_liv } from "../../actions/library";
import { AiFillHeart } from "react-icons/ai";
import { ImSad } from "react-icons/im";

const API_HOST = ENV.api_host;
class LibraryPage extends React.Component {
  // Here we should call database to get the reviewsId, reviews, reviewsCommentId, reviewsComment and rates
  constructor(props) {
    super(props);
    this.state = {
      url: `${API_HOST}/api/libraries/` + this.props.lib.match.params["libId"],
      apiResponse: {
        _id: "",
        name: "",
        description: "",
        picture: "",
        language: "",
        comments: [],
        rate: 0,
      },
      favor_btn: "Favor this library",
      page_valid: true,
    };
  }
  check_if_fav_lib = (app) => {
    app.state.fav_posts.forEach((lib) => {
      if (lib.lib_id === this.state.apiResponse._id) {
        this.setState({ favor_btn: "Favored!" });
      }
    });
  };
  click_fav_button = (app) => {
    add_to_userfav_liv(app, this);
    this.setState({ favor_btn: "Favored!" });
  };
  setUpAPI = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ apiResponse: res });
      });
  };

  mountAPI(app) {
    fetch(this.state.url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ apiResponse: res });
        this.check_if_fav_lib(this.props.app);
      })
      .catch((error) => {
        this.setState({ page_valid: false });
      });
  }
  componentWillMount() {
    this.mountAPI(this.props.app);
  }

  render() {
    const { app } = this.props;

    return (
      <div className="App">
        <Navbar app={app} />
        {this.state.page_valid ? (
          <div className="ApiBody">
            {!app.state.currentUser || !app.state.is_regUser ? (
              <div></div>
            ) : (
              <button onClick={(e) => this.click_fav_button(app, e)}>
                {this.state.favor_btn}
                <AiFillHeart id="review_heart" />
              </button>
            )}

            <div className="ApiT">
              <h1>
                <strong>
                  <u id="api-name">{this.state.apiResponse["name"]}</u>
                </strong>
              </h1>
            </div>
            <div>
              <h2>
                <u id="desc-review">Description</u>
              </h2>
              <p id="review_desc">{this.state.apiResponse["description"]}</p>
            </div>
            <Review
              library={this.state.apiResponse}
              app={app}
              url={this.state.url}
              mountAPI={this.setUpAPI}
            />
          </div>
        ) : (
          <div id="non-exist">
            Library no longer exists (deleted)!
            <br />
            <ImSad />
          </div>
        )}
      </div>
    );
  }
}

export default LibraryPage;
