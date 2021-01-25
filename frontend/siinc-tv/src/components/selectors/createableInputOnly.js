import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

/**
 * Handles entering tags to our react-select componenet
 * 
 * @prop {String} inputValue current value to enter
 * @prop {String[]} value current values
 * @prop {Function} updateTags setter for updating tags
 * @component
 * @category Frontend
 */
export default class CreatableInputOnly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      value: [],
      style: props.style,
      updateTags: props.updateTags,
    };
  }

  /**
   * Handles a change of the selector
   * @param {*} value
   * @param {*} actionMeta
   */
  handleChange = (value, actionMeta) => {
    this.setState({ value });
  };

  /**
   * Handles change of the selector input
   * @param {*} inputValue
   */
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };

  /**
   * Handles key pressed in selector
   * @param {*} event what event occured
   */
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (this.state.value === null) {
          this.setState({
            value: [createOption(inputValue)],
            inputValue: "",
          });
          this.state.updateTags([createOption(inputValue)]);
        } else {
          this.setState({
            value: [...value, createOption(inputValue)],
            inputValue: "",
          });
          this.state.updateTags([...value, createOption(inputValue)]);
        }

        event.preventDefault();
        console.log(value);
        break;
      default:
        return;
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
        placeholder="Type relevant tags and press enter..."
        value={value}
      />
    );
  }
}
