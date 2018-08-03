import React, { Component } from 'react';
import { TextInput, View ,Text, Alert, Button} from 'react-native';
import Main from './components/Main/Main.component'
import {Header} from 'react-native-elements'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={{
        flex:1,
      }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'STUD(y)', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}/>
        <Main/>
      </View>
    );
  }
}