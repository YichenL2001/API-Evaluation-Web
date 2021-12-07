import React from "react";
import { admin_send_user_info } from "../../actions/user";

class AdminEdit extends React.Component {
  handleSubmit = (event, id, AdminPage) => {
    event.preventDefault();
    admin_send_user_info(id, AdminPage);
    AdminPage.setFalse2();
  };
  handleInputChange = (event, AdminPage) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newPerson = AdminPage.state.user;
    newPerson[name] = value;
    AdminPage.setState({
      user: newPerson,
    });
  };
  render() {
    const { AdminPage } = this.props;
    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="formElements">
            <div>User Info Of : {AdminPage.state.curr_username}</div>
            {Object.keys(AdminPage.state.user).map((item, index) => {
              return (
                <div className="formElement" key={index}>
                  <label>{item}:</label>
                  {index < 5 ? (
                    <input
                      type="text"
                      name={item}
                      onChange={(e) => this.handleInputChange(e, AdminPage)}
                      value={AdminPage.state.user[item] || ""}
                    />
                  ) : (
                    <textarea
                      type="text"
                      name={item}
                      onChange={(e) => this.handleInputChange(e, AdminPage)}
                      value={AdminPage.state.user[item] || ""}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <button
            className="submit-btn"
            onClick={(e) => {
              this.handleSubmit(e, AdminPage.state.curr_userId, AdminPage);
            }}
          >
            submit
          </button>
          <button className="cancel-btn" onClick={AdminPage.setFalse2}>
            cancel
          </button>
        </div>
      </div>
    );
  }
}
export default AdminEdit;
