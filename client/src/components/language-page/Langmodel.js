import React from "react";

import "./Language.css";
import Navbar from "../Navbar";

import Header from "../Header";
import Searchbox from "./Searchbox";
import { TiArrowDownThick } from "react-icons/ti";

import LangComp from "./LangComp";
class Langmodel extends React.Component {
  compare(a, b){
    if ( a['rate'] < b['rate'] ){
      return 1;
    }
    if ( a['rate'] > b['rate'] ){
      return -1;
    }
    return 0;
  }
  render() {
    const { info, app } = this.props;
    const i2 = info.sort(this.compare);
    return (
      <div>
        <Header app={app} />
        <Navbar app={app} />
        <div className="content">
          <div className="leftLang">
            <h3 id="postPrompt" style={{ color: "white" }}>
              Posts by ranking
            </h3>
            <TiArrowDownThick id="arrowIcon" />
            <br />
            {i2.map((item, index) => {
              return (
                <LangComp
                  pic={item.pic}
                  name={item.name}
                  description={item.description}
                  url={item.url}
                  rate={item.rate}
                  key={index}
                />
              );
            })}
          </div>
          <div className="rightLang">
            <Searchbox />
          </div>
        </div>
      </div>
    );
  }
}

export default Langmodel;
