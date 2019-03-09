/* eslint-disable react/prop-types */
import React from 'react';



export default class FloatingLabelInput extends React.Component {
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
    return (
      <div className="floatingLabelInput">
        <label className={this.state.fieldActive ? 'on' : ''}>{this.props.placeholder}</label>
        <input
          placeholder={this.props.placeholder}
          onFocus={this.activateField}
          onBlur={this.deactivateField}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}
