import "./Searchbox.css";
import React from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { getLibName } from "../../actions/library";
class Searchbox extends React.Component {
  state = {
    libName: "",
    libID: "",
    libPic: "",
    libFound: true,
    searchbox: "",
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    this.setState({
      searchbox: value,
    });
  };

  cancelSearch = () => {
    this.setState({
      libName: "",
      libID: "",
      libPic: "",
      libFound: true,
      searchbox: "",
    });
  };

  findlib = () => {
    getLibName(this);
  };
  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Search for libaries..."
            className="searchBox"
            value={this.state.searchbox || ""}
            onChange={this.handleInputChange}
          />
          <button onClick={this.findlib}>
            <BiSearchAlt2 />
          </button>
          <button onClick={this.cancelSearch} id="cancel-btn-search">
            cancel
          </button>
        </div>
        <br />
        {this.state.libFound ? (
          <div id="searchbox-wrapper">
            <Link to={"/LibraryPage/" + this.state.libID}>
              {this.state.libName}
            </Link>
            <img className="searchbox-lib-img" src={this.state.libPic} alt={this.state.libName} />
          </div>
        ) : (
          <p>
            &nbsp;&nbsp;Lib not found! Please try again! <br />
            &nbsp;&nbsp;(Please use CamelCase and space)
          </p>
        )}
      </div>
    );
  }
}

export default Searchbox;
