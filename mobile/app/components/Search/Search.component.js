import React from 'react';
import axios from 'axios';
import { SearchBar, Icon } from 'react-native-elements';
import { Keyboard, TextInput, View ,Text, Alert, Button} from 'react-native';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params:{
        location: '',
        coffee: 0,
        atmosphere: 0,
        comfort: 0,
        food: 0,
        radius: 800
      }
    };

    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(input){
    let tempParams = Object.assign({},this.state.params)
    tempParams.location = input
    this.setState({
      params: tempParams
    })
  }


  render() {
    return (
      <View style={{flexDirection: 'row'}}>
          <Icon
            name='search'
            onPress={()=>this.props.handleSearch(this.state.params)}/>
          <TextInput
            style={{height: 40, width: "80%"}}
            onChangeText={this.handleInput}
            returnKeyType='search'
            onSubmitEditing={()=>this.props.handleSearch(this.state.params)}
            placeholder='Enter your address to find a STUD(y) spot...' />
        </View>
    );
  }
}