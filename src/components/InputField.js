/* eslint-disable react/prop-types */
import React from 'react';
import validator from 'validator';
import Icon from "./icons/index";

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.labelClasses = 'form-label animated-label';
    this.inputClasses = 'form-input animated-input';

    this.state = {
      fieldActive: false,
      amount: undefined,
      hasError: false
    };
  }

  updateClasses = () => {
    this.labelClasses = (this.state.fieldActive? `${this.labelClasses} infocus` : this.labelClasses);
    this.labelClasses = (this.state.hasError? `${this.labelClasses} error infocus` : this.labelClasses.replace('error', ''));
    this.inputClasses = (this.state.hasError? `${this.inputClasses} error`: this.inputClasses);
  }

  deactivateField = (e) => {
    if (e.target.value === '') {
      this.setState({ fieldActive: false });
    }
  };

  handleInput = (e) => {
    const amount = e.target.value;

    if ( validator.isNumeric(amount.toString())) {
      this.setState(() => ({ amount, hasError: false }));
    } else {
      this.setState({ hasError: true });
    }

    this.activateField(e);
    e.preventDefault();
  };

  activateField = () => { this.setState({ fieldActive: true }); };

  render() {
    this.updateClasses();
    return (
      <div className="form-fields">
        <Icon name="Add" width={50} height={50} />
        <Icon name="Substract" width={50} height={50} className="svgicon"/>
        <div className="animated-inputlabel">
          <input
            className= {this.inputClasses}
            id="amount"
            type="number"
            name="amount"
            onFocus={this.activateField}
            onBlur={this.deactivateField}
            onChange={this.handleInput}
          />
          <label 
            className={this.labelClasses} 
            htmlFor="amount">
            Email
          </label>
        </div>
        <div className="text-danger">
          Errors are here
        </div>
      </div>
    );
  }
}
