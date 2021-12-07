import React from "react";
import "./styles.css";
import StarRatings from "react-star-ratings";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

// need to install "npm i react-star-ratings"
class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0,
    };
  }
  setRate = (rating) => {
    this.setState({ rate: rating });
  };
  submitComment = (index) => {
    var node = document.getElementsByClassName("replyForm");
    const textContent = node[index].innerText;
    fetch(this.props.url + "/" + this.props.library["comments"][index]._id, {
      method: "Post",
      body: JSON.stringify({
        user_id: this.props["app"].state.id,
        username: this.props["app"].state.currentUser,
        comment: textContent,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      this.props.mountAPI(this.props.url);
    });
    node[index].innerText = "";
  };

  deleteComment = (index, i) => {
    fetch(
      this.props.url +
        "/" +
        this.props.library["comments"][index]._id +
        "/" +
        this.props.library["comments"][index]["replies"][i]._id,
      {
        method: "Delete",
      }
    ).then((res) => {
      this.props.mountAPI(this.props.url);
    });
  };
  submitReview = () => {
    var node = document.getElementById("commentForm");
    const textContent = node.innerText;
    fetch(this.props.url, {
      method: "Post",
      body: JSON.stringify({
        user_id: this.props["app"].state.id,
        username: this.props["app"].state.currentUser,
        comment: textContent,
        rate: this.state.rate,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      this.props.mountAPI(this.props.url);
    });
    node.innerText = "";
    this.setState({ rate: 0 });
  };

  deleteReview = (index) => {
    fetch(this.props.url + "/" + this.props.library["comments"][index]._id, {
      method: "Delete",
    }).then((res) => {
      this.props.mountAPI(this.props.url);
    });
  };
  render() {
    const app = this.props["app"];
    return (
      <div className="reviews">
        <h2>
          <u className="review_lst">Overall rate</u>{" "}
          <StarRatings
            rating={this.props.library["rate"]}
            starRatedColor="orange"
            starDimension="30px"
            starSpacing="5px"
          />
        </h2>
        <h2>
          <u className="review_lst">Reviews</u>
        </h2>
        <div className="review">
          {this.props.library["comments"].map((comment, index) => (
            <div key={"comment" + index}>
              {app.state.currentUser ? (
                <Link to={"/profile/" + comment["user_id"]}>
                  <h2>{comment["username"]}</h2>
                </Link>
              ) : (
                <h2>{comment["username"]}</h2>
              )}
              <StarRatings
                rating={comment["rate"]}
                starRatedColor="orange"
                starDimension="18px"
                starSpacing="2px"
              />
              <p id="review_comment">
                {comment["comment"]}
                {app.state.currentUser && !app.state.is_regUser ? (
                  <button
                    className="review_cross"
                    onClick={this.deleteReview.bind(this, index)}
                  >
                    <ImCross />
                  </button>
                ) : null}
              </p>
              <div id="line-separator"></div>
              <br />
              {comment["replies"].map((reply, i) => (
                <div key={"reply" + i}>
                  <p>
                    Reply: {reply["comment"]}&nbsp;&nbsp; (by user:&nbsp;
                    {reply["username"]})
                    {app.state.currentUser && !app.state.is_regUser ? (
                      <button
                        className="review_cross"
                        onClick={this.deleteComment.bind(this, index, i)}
                      >
                        <ImCross />
                      </button>
                    ) : null}
                  </p>
                </div>
              ))}
              {!app.state.currentUser ? (
                <div className="replyForm">Login to reply</div>
              ) : (
                <div>
                  <div contentEditable="true" className="replyForm"></div>
                  <button onClick={this.submitComment.bind(this, index)}>
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {!app.state.currentUser ? (
          <div id="commentForm">Login to post a review</div>
        ) : (
          <div>
            <StarRatings
              rating={this.state.rate}
              changeRating={this.setRate}
              starRatedColor="orange"
              starDimension="22px"
              starSpacing="2px"
              starHoverColor="orange"
            />
            <br />
            <div contentEditable="true" id="commentForm"></div>
            <button onClick={this.submitReview} className="commentButton">
              Submit Review
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Reviews;
