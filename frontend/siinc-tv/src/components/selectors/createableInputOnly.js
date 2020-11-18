import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export default class CreatableInputOnly extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      value: [],
      style: props.style
    };
  }

  handleChange = (value, actionMeta) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
  };
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':

        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        if(this.state.value === null)
        {
          this.setState({
            inputValue: '',
            value: [createOption(inputValue)],
          });
        }
        else{
          this.setState({
            inputValue: '',
            value: [...value, createOption(inputValue)],
          });
        }

        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    return (
      <CreatableSelect
        styles={this.state.style}
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
      />
    );
  }
}