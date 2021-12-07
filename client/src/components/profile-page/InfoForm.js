import React from "react";
import "./Form.css";

class InfoForm extends React.Component {
  render() {
    const { dynamicPerson, togglePop, handleInputChange } = this.props;
    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="formElements">
            {Object.keys(dynamicPerson).map((item, index) => {
              return (
                <div className="formElement" key={index}>
                  <label>{item}:</label>
                  {index < 5 ? (
                    <input
                      type="text"
                      name={item}
                      onChange={handleInputChange}
                      value={dynamicPerson[item] || ""}
                    />
                  ) : (
                    <textarea
                      type="text"
                      name={item}
                      onChange={handleInputChange}
                      value={dynamicPerson[item] || ""}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <button className="submit-btn" type="submit">
            submit
          </button>
          <button className="cancel-btn" onClick={togglePop}>
            cancel
          </button>
        </div>
      </div>
    );
  }
}

export default InfoForm;
