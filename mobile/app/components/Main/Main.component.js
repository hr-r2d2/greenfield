import React, { Component } from 'react';
import { TextInput, View ,Text, Alert, Button} from 'react-native';
import styles from './Main.component.style';
import { SearchBar } from 'react-native-elements'
import axios from 'axios'

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {cafes: []}

    this.handleInput = this.handleInput.bind(this)
  }
  
  handleInput(input){
    this.setState({
      location: input
    })
  }

  handleYelp(data) {
    this.setState({
      cafes: data
    });
  }

  handleSearch(){
    Alert.alert('You tapped the button!');
    axios
      .get('http://10.16.3.114:8080/search', {
        params: {
          location: this.state.location,
          coffee: 0,
          atmosphere: 0,
          comfort: 0,
          food: 0,
          radius: 800
        }
      })
      .then((res) => {
        this.handleYelp(res.data.businesses);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{height: 40, width: "80%"}}
            onChangeText={this.handleInput}
            placeholder='Enter your address to find a STUD(y) spot...' />
          <Button onPress={()=>this.handleSearch()} title='Search'></Button>
        </View>
        
        {this.state.cafes.map(cafe=>(
          <Text>{cafe.name}</Text>
        ))}
      </View>
    );
  }
}