import React from "react";
import Signup from "./Signup";

class SignupPage extends React.Component {
  state = {
    username: "",
    password: "",
    message: { type: "", body: "" },
  };
  render() {
    const { setFalse, prompt } = this.props;
    return (
      <div className="w-100">
        <Signup setFalse={setFalse} SignupPage={this} prompt={prompt} />
      </div>
    );
  }
}
export default SignupPage;
