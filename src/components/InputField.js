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
      fieldActive: false,
      amount: '',
      hasError: false
    };
  }

  updateClasses = () => {
    const { fieldActive, amount, hasError } = this.state;
    // let labelClasses = this.labelClasses;
    // let inputClasses = this.inputClasses;

    let { labelClasses, inputClasses } = this;

    labelClasses = ((fieldActive && !labelClasses.includes('infocus')) ? `${labelClasses} infocus` : labelClasses.replace(' infocus', ''));
    labelClasses = ((hasError && !labelClasses.includes('error')) ? `${labelClasses} error` : labelClasses.replace(' error', ''));
    labelClasses = (!hasError && !fieldActive && amount !== '' && !labelClasses.includes('success')) ? `${labelClasses} success` : labelClasses;
    labelClasses = (!hasError && labelClasses.includes('error')) ? labelClasses.replace(' error', '') : labelClasses;

    inputClasses = ((hasError && !inputClasses.includes('error')) ? `${inputClasses} error` : inputClasses.replace(' error', ''));
    inputClasses = (!hasError && !fieldActive && amount !== '' && !inputClasses.includes('success')) ? `${inputClasses} success` : inputClasses;
    
    console.log(!hasError , !fieldActive , amount !== '' , !labelClasses.includes('success') );

    this.labelClasses = labelClasses;
    this.inputClasses = inputClasses;
  };

  deactivateField = (e) => {
    if (!this.state.hasError) {
      this.setState({ fieldActive: false });
    }
  };

  handleInput = (e) => {
    
    const amount = e.target.value.trim();
    // console.log('!amount', !amount);
    // console.log('match', !!amount.match(/^\d{1,}(\.\d{0,2})?$/));
    // console.log('validator', validator.isNumeric(amount) );
    // console.log(!amount, amount.match(/^\d{1,}(\.\d{0,2})?$/), validator.isNumeric(amount));
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) || validator.isNumeric(amount)) {
      this.setState(() => ({ amount, hasError: false  }));
    } else {
      this.setState({ hasError: true });
    }
    // this.updateClasses();
    this.activateField(e);
    e.preventDefault();
  };

  activateField = () => { this.setState({ fieldActive: true }); this.updateClasses(); };

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
            onChange={this.handleInput}
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
