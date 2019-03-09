/* eslint-disable react/prop-types */
import React from 'react';


export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldActive: false,
      inputValue: ''
    };
  }


  deactivateField = (e) => {
    if (e.target.value === '') {
      this.setState({ fieldActive: false });
    }
  };

  handleInput = (e) => {
    this.setState({ inputValue: e.target.value });
    this.activateField(e);
    e.preventDefault();
  };

  activateField = () => { this.setState({ fieldActive: true }); };

  render() {
    const label = 'form-label animated-label';
    const labelInFocus = `${label} infocus`;

    return (
      <div className="form-fields">
        <div className="animated-inputlabel">
          <input
            className="form-input animated-input"
            id="email"
            type="email"
            name="email"
            onFocus={this.activateField}
            onBlur={this.deactivateField}
            onChange={this.handleInput}
          />
          <label 
            className={this.state.fieldActive ? labelInFocus : label} 
            htmlFor="email">
            Email
          </label>
        </div>


      <div className="text-danger">
        Errors
      </div>

      </div>


    );
  }
}
