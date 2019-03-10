/* eslint-disable react/prop-types */
import React from 'react';
import validator from 'validator';
import Icon from './icons/index';

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.labelClasses = 'form-label animated-label';
    this.inputClasses = 'form-input animated-input';

    this.state = {
      touched: false,
      isActive: false,
      amount: '',
      hasError: false,
      required: true
    };
  }

  toggleCssClass = (flag1, flag2, originalStr, cssClass) => {
    let str = originalStr;
    str = (flag1 && !str.includes(cssClass)) ? `${str} ${cssClass}` : str;
    str = flag2 ? str.replace(` ${cssClass}`, '') : str;
    return str;
  }

  updateClasses = () => {
    const { touched, isActive, amount, hasError } = this.state;
    let { labelClasses, inputClasses } = this;

    // Once touched label always transformed
    labelClasses = (touched && !labelClasses.includes('transformed')) ? `${labelClasses} transformed` : labelClasses;
    // Toggle other label classes
    labelClasses = this.toggleCssClass(isActive, !isActive, labelClasses, 'infocus');
    labelClasses = this.toggleCssClass(hasError, !hasError, labelClasses, 'error');
    let flag1 = (!hasError && validator.isNumeric(amount) && !labelClasses.includes('success'));
    let flag2 = hasError;
    labelClasses = this.toggleCssClass(flag1, flag2, labelClasses, 'success');
    // Input Classes
    inputClasses = this.toggleCssClass(hasError, !hasError, inputClasses, 'error');
    flag1 = (!hasError && validator.isNumeric(amount) && !inputClasses.includes('success'));
    flag2 = hasError;
    inputClasses = this.toggleCssClass(flag1, flag2, inputClasses, 'success');
    this.labelClasses = labelClasses;
    this.inputClasses = inputClasses;
  };

  deactivateField = () => {
    this.setState({ isActive: false });
  };

  onInputChange = (e) => {
    e.preventDefault();
    const currentValue = e.target.value.trim();
    const isValid = this.validateInput(currentValue);
    if (isValid) {
      this.setState(() => ({ amount: currentValue, hasError: false }));
    } else {
      this.setState({ hasError: true });
    }
  }

  validateInput = (currentValue) => {    
    const { touched, isActive, required } = this.state;
    let isValid = false;
    isValid = validator.isNumeric(currentValue);
    if (currentValue === '' && touched && isActive && !required) {
      isValid = true;
    }
    return isValid;
  };

  activateField = () => { this.setState({ isActive: true, touched: true }); };

  render() {
    this.updateClasses();
    return (
      <div className="form-fields">
        {/* <Icon name="Add" width={50} height={50} className="svgicon svgicon--success" />
        <Icon name="Substract" width={50} height={50} className="svgicon svgicon--danger" /> */}
        <div className="animated-inputlabel">
          <input
            className={this.inputClasses}
            id="amount"
            type="text"
            name="amount"
            // value={this.state.amount}
            onFocus={this.activateField}
            onBlur={this.deactivateField}
            onChange={this.onInputChange}
          />
          <label
            className={this.labelClasses}
            htmlFor="amount"
          >
            Email
          </label>
        </div>
        <div className="diagnose-field pt-1 active">
          <p className="m-0 diagnose-field__message">errors</p>
        </div>
      </div>
    );
  }
}
