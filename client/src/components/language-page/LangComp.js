import React from "react";
import "./Language.css";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

class LangComp extends React.Component {
  render() {
    const { pic, name, description, url, rate } = this.props;
    return (
      <div className="demolang">
        <div className="imgWrapper">
          <img src={pic} alt="" />
        </div>
        <div className="vertical"></div>
        <div className="plang">
          <div id="name-star">
            <Link to={url}>
              <h4>{name}</h4>
            </Link>
            <StarRatings
              rating={rate}
              starRatedColor="orange"
              starDimension="15px"
              starSpacing="2px"
            />
          </div>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default LangComp;
