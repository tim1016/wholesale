import React from 'react';


export default class FloatingLabelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: ''
    };
  }

  handleInput = (e) => {
    if (e.target.value !== '') {
      this.setState({ className: 'on' });
    } else {
      this.setState({ className: '' });
    }

    // run
  }

  render() {
    return (
      <div className="floatingLabelInput">
        <label className={this.state.className}>{this.props.placeholder}</label>
        <input 
        placeholder={this.props.placeholder} 
        onChange={this.handleInput}
        // onFocus={this.activateField}
        // onBlur={this.disableField}
        // onChange={this.updateInputValue}
        />
      </div>
    );
  }
}
