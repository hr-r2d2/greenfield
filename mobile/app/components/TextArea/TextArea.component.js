import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import styles from './TextArea.component.style';

class TextArea extends Component {
  render() {
    const {...extraProps} = this.props;
    return (
      <TextInput
        {...extraProps}
        style={[styles.textArea, extraProps.style]}
        multiline = {true}
        placeholder='Enter your address to find a STUD(y) spot...'
        onChangeText={(text) => this.props.handleTextInput(text)}
      />
    );
  }
}

export default TextArea;