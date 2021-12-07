import "./Home.css";
import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import ENV from "./../../config.js";
import LangComp from "../language-page/LangComp.js";
import { IoFootball } from "react-icons/io5";

const API_HOST = ENV.api_host;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `${API_HOST}/api/libraries`,
      apiResponse: [
        {
          picture: "",
          name: "",
          description: "",
          url: "",
          rate: 0,
          _id: "",
        },
        {
          picture: "",
          name: "",
          description: "",
          url: "",
          rate: 0,
          _id: "",
        },
      ],
    };
  }
  setUpAPI() {
    fetch(this.state.url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ apiResponse: res["libraries"] });
      });
  }
  compare(a, b) {
    if (a["rate"] < b["rate"]) {
      return 1;
    }
    if (a["rate"] > b["rate"]) {
      return -1;
    }
    return 0;
  }
  componentDidMount() {
    this.setUpAPI();
  }
  render() {
    const { app } = this.props;
    const lib = this.state.apiResponse.sort(this.compare);
    var r1 = Math.floor(Math.random() * lib.length);
    var r2 = Math.floor(Math.random() * lib.length);
    if (r1 === r2) {
      r2 = Math.floor(Math.random() * lib.length);
    }
    return (
      <div>
        <Header app={app} />
        <Navbar app={app} />
        <div className="content">
          <div className="leftHome">
            <h3 style={{ color: "white" }}>Trending posts...</h3>
            {lib.slice(0, 2).map((item, index) => {
              return (
                <LangComp
                  pic={item.picture}
                  name={item.name}
                  description={item.description}
                  url={`/LibraryPage/${item._id}`}
                  rate={item.rate}
                  key={index}
                />
              );
            })}
            <h3 style={{ color: "white" }}>What you might like...</h3>
            <LangComp
              pic={lib[r1].picture}
              name={lib[r1].name}
              description={lib[r1].description}
              url={`/LibraryPage/${lib[r1]._id}`}
              rate={lib[r1].rate}
              key={r1}
            />
            <LangComp
              pic={lib[r2].picture}
              name={lib[r2].name}
              description={lib[r2].description}
              url={`/LibraryPage/${lib[r2]._id}`}
              rate={lib[r2].rate}
              key={r2}
            />
          </div>
          <div>
            <div id="images-wrapper">
              <img src="logo1.png" id="logo-home" alt='logo'></img>
              <div>
                <IoFootball id="home-ball" />
                <img
                  className="logo-right"
                  src="logo1.png"
                  id="logo-home"
                  alt='logo'
                ></img>
              </div>

              <img src="logo1.png" id="logo-home" alt='logo'></img>
              <div>
                <IoFootball id="home-ball" />
                <img
                  className="logo-right"
                  src="logo1.png"
                  id="logo-home"
                  alt='logo'
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
