/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
import React from 'react';
import validate from '../utilities/validateInput';
import Icon from './icons/index';

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.labelClasses = 'form-label animated-label';
    this.inputClasses = 'form-input animated-input';
    this.buttonClasses = 'btn vary-button';
    this.userInput = '';

    this.state = {
      touched: false,
      isActive: false,
      amount: '',

      hasError: false,
      required: true,
      inputType: 'number',
      name: 'Field',
      allowVariation: true,
      step: 10
    };
  }

  varyAmount = (e) => {
    const type = e.target.closest('Button').name;
    const { hasError, amount, step } = this.state;
    if (!hasError) {
      let number = parseFloat(amount);
      if (type === 'increment') {
        number += step;
      } else if (type === 'decrement') {
        number -= step;
      }
      this.setState({ amount: number.toString() });
    }
  };

  toggleCssClass = (flag1, flag2, originalStr, cssClass) => {
    let str = originalStr;
    str = (flag1 && !str.includes(cssClass)) ? `${str} ${cssClass}` : str;
    str = flag2 ? str.replace(` ${cssClass}`, '') : str;
    return str;
  };

  updateClasses = () => {
    const {
      touched, isActive, amount, hasError, inputType
    } = this.state;
    let { labelClasses, inputClasses, buttonClasses } = this;

    // Once touched label always transformed
    labelClasses = (touched && !labelClasses.includes('transformed')) ? `${labelClasses} transformed` : labelClasses;
    // Toggle other label classes
    labelClasses = this.toggleCssClass(isActive, !isActive, labelClasses, 'infocus');
    labelClasses = this.toggleCssClass(hasError, !hasError, labelClasses, 'error');
    let flag1 = (!hasError && validate(inputType, amount) && !labelClasses.includes('success'));
    let flag2 = hasError;
    labelClasses = this.toggleCssClass(flag1, flag2, labelClasses, 'success');
    // Input Classes
    inputClasses = this.toggleCssClass(hasError, !hasError, inputClasses, 'error');
    flag1 = (!hasError && validate(inputType, amount) && !inputClasses.includes('success'));
    flag2 = hasError;
    inputClasses = this.toggleCssClass(flag1, flag2, inputClasses, 'success');
    this.labelClasses = labelClasses;
    this.inputClasses = inputClasses;

    // Vary button
    buttonClasses = this.toggleCssClass(isActive, !isActive, buttonClasses, 'infocus');
    buttonClasses = this.toggleCssClass(hasError, !hasError, buttonClasses, 'error');
    flag1 = (!hasError && validate(inputType, amount) && !buttonClasses.includes('success'));
    flag2 = hasError;
    buttonClasses = this.toggleCssClass(flag1, flag2, buttonClasses, 'success');
    this.labelClasses = labelClasses;
    this.buttonClasses = buttonClasses;
  };

  deactivateField = (e) => {
    const currentValue = e.target.value.trim();
    const isValid = this.validateInput(currentValue);
    if (isValid) {
      this.setState(() => ({ amount: currentValue, hasError: false, isActive: false }));
    } else {
      this.setState({ hasError: true });
    }
  };

  onInputChange = (e) => {
    e.preventDefault();
    this.userInput = e.target.value;
    const currentValue = e.target.value.trim();
    const isValid = this.validateInput(currentValue);
    if (isValid) {
      this.setState(() => ({ amount: currentValue, hasError: false }));
    } else {
      this.setState({ hasError: true });
    }
  };

  validateInput = (currentValue) => {
    const {
      touched, isActive, required, inputType
    } = this.state;
    let isValid = false;
    const coerced = `${currentValue}`;
    isValid = validate(inputType, coerced);
    if (currentValue === '' && touched && isActive && !required) {
      isValid = true;
    }
    return isValid;
  };

  activateField = () => { this.setState({ isActive: true, touched: true }); };

  render() {
    const {
      hasError, required, touched, amount, inputType, name, allowVariation
    } = this.state;
    window.l = this.state; // remove
    const disabled = hasError;
    this.updateClasses();

    return (
      <div className="field-container">
        <div className="inputfield-container text-center">
          { allowVariation
            && (
            <button
              type="button"
              name="decrement"
              disabled={disabled}
              className={`${this.buttonClasses} leftButton pl-1`}
              onClick={this.varyAmount}
            >
              <Icon name="Substract" width={100} height={100} className={disabled ? 'svgicon invisible' : 'svgicon'} />
            </button>
            )
          }
          <div className="form-fields">
            <div className="animated-inputlabel">
              <input
                className={this.inputClasses}
                id="amount"
                type="text"
                name="amount"
                value={(hasError) ? this.userInput : amount}
                onFocus={this.activateField}
                onBlur={this.deactivateField}
                onChange={this.onInputChange}
              />
              <label
                className={this.labelClasses}
                htmlFor="amount"
              >
                {name}
                <small>
                  <em>
                    { touched ? '' : ' (required)' }
                  </em>
                </small>
              </label>
            </div>

          </div>
          { allowVariation
            && (
            <button
              type="button"
              name="increment"
              disabled={disabled}
              className={`${this.buttonClasses} rightButton pr-1`}
              onClick={this.varyAmount}
            >
              <Icon name="Add" width={50} height={50} className={disabled ? 'svgicon invisible' : 'svgicon'} />
            </button>
            )
          }
        </div>

        <div className="helpfield-container">
          <div className={hasError ? 'diagnose-field active text-danger' : 'diagnose-field'}>
            <p
              className="m-0 diagnose-field__message"
            >
              { (this.userInput === '' && required) ? `${name} is required.` : `Not a valid ${inputType}` }
            </p>
          </div>
        </div>
      </div>
    );
  }
}
