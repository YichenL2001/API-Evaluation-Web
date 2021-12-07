import React from "react";
import Langmodel from "./Langmodel";
import { getLibs } from "../../actions/library";

class Javapage extends React.Component {
  componentDidMount() {
    getLibs("java", this);
  }
  state = { Info: [] };
  render() {
    const { app } = this.props;

    return <Langmodel info={this.state.Info} app={app} />;
  }
}

export default Javapage;
